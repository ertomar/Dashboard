import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { TableData } from "app/interfaces/table-data";
import { LinesService } from "app/services/lines.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationsComponent } from "../notifications/notifications.component";
import { Line } from "../../classes/line";

declare var google: any;

@Component({
  moduleId: module.id,
  selector: "app-lines",
  templateUrl: "./lines.component.html",
  styleUrls: ["./lines.component.css"],
})
export class LinesComponent implements OnInit {
  constructor(
    private notificationComponent: NotificationsComponent,
    private _LinesService: LinesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getLines();
  }
  submitted = false;

  public lines: TableData;
  public line = new Line("", "", 0, []);
  map: any;
  marker: any;
  station = {
    lat: 0,
    lng: 0,
    name: "",
  };
  stations: any = [];

  public linesTable: TableData;
  addMarker(pos) {
    if (this.marker) {
      this.marker.setMap(null);
    }

    var bluePoint = {
      path: "M-1,0a1,1 0 1,0 2,0a1,1 0 1,0 -2,0",
      fillColor: "white",
      fillOpacity: 0.8,
      scale: 1,
      strokeColor: "#673ab7",
      strokeWeight: 14,
    };

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(pos.lat, pos.lng),
      title: "Driver's live location",
      icon: bluePoint,
    });
    // To add the marker to the map, call setMap();
    if (this.map) {
      this.map.setCenter({
        lat: pos.lat,
        lng: pos.lng,
      });
    }
    this.marker.setMap(this.map);
  }
  getLines() {
    this.linesTable = null;
    this._LinesService.getLines().subscribe((lines) => {
      this.lines = {
        headerRow: ["From", "To", "Cost", "Stations Number"],
        keys: ["from", "to", "cost", "_stations"],
        dataRows: lines,
        title: "Lines",
        buttonName: "Delete",
        searchField: "from",
      };
      this.linesTable = Object.assign({}, this.lines);
      this.linesTable.dataRows.forEach((line) => {
        try {
          line._stations = line._stations.length;
        } catch (error) {
          console.log(error);
        }
      });
    });
  }
  deleteClicked(index) {
    let line = this.lines.dataRows[index];
    if (
      confirm(`Are you sure you want to delete ${line.from}-${line.to} line?`)
    ) {
      this._LinesService.deleteLine(line._id).subscribe(
        (response) => {
          this.getLines();
        },
        (error: any) => {
          this.notificationComponent.showNotification(error.error);

          console.clear();
        }
      );
    }
  }
  onSubmit() {
    this.submitted = true;
  }
  onSubmitStation() {
    let stationCopy = {
      coordinates: [this.station.lng, this.station.lat],
      name: this.station.name,
      type: "Point",
    };
   
    this.stations.push(stationCopy);

    this.station = {
      lat: 0,
      lng: 0,
      name: "",
    };
    
  }
  @ViewChild("map") mapView: ElementRef;
  InitiateMap() {
    var myLatlng = new google.maps.LatLng(
      30.031801669395225,
      31.235805050112123
    );

    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
      styles: [
        {
          featureType: "water",
          stylers: [{ saturation: 43 }, { lightness: -11 }, { hue: "#0088ff" }],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [
            { hue: "#ff0000" },
            { saturation: -100 },
            { lightness: 99 },
          ],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#808080" }, { lightness: 54 }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#ece2d9" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#ccdca1" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#767676" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#ffffff" }],
        },
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
        },
        { featureType: "poi.park", stylers: [{ visibility: "on" }] },
        {
          featureType: "poi.sports_complex",
          stylers: [{ visibility: "on" }],
        },
        { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "simplified" }],
        },
      ],
    };

    this.map = new google.maps.Map(this.mapView.nativeElement, mapOptions);
    this.map.addListener("click", (mapsMouseEvent) => {
      this.addMarker({
        lat: mapsMouseEvent.latLng.lat(),
        lng: mapsMouseEvent.latLng.lng(),
      });
      this.station.lat = mapsMouseEvent.latLng.lat();
      this.station.lng = mapsMouseEvent.latLng.lng();
    });
  }
  clearStations() {
    this.stations = [];
  }
  confirm() {
    this.line._stations = this.stations;
    this._LinesService.addLine(this.line).subscribe(
      (response: any) => {
        this.notificationComponent.showNotification("Line has been added.");
        this.submitted = false;
        this.newLine();
        this.getLines();
        this.ngOnInit();
      },
      (error: any) => {
        this.notificationComponent.showNotification(error.error);

        console.clear();
      }
    );
  }
  deleteStation(i) {
    this.stations.splice(i, 1);
  }
  newLine() {
    this.line = new Line("", "", 0, []);
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.InitiateMap();
  }
}
