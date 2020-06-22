import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, Subscription } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Driver } from "app/classes/driver";
import { DriversService } from "app/services/drivers.service";

declare var google: any;

@Component({
  moduleId: module.id,
  selector: "maps-cmp",
  templateUrl: "maps.component.html",
  styleUrls: ["./maps.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class MapsComponent implements OnInit {
  items: Observable<any[]>;
  map: any;
  marker: any;
  firstFormGroup: FormGroup;
  selectedDriver: Driver;
  private subscription: Subscription;
  drivers = [];
  driversIds = [];
  constructor(
    db: AngularFireDatabase,
    private _formBuilder: FormBuilder,
    private _DriversService: DriversService
  ) {
    this.items = db.list("clax-lines").valueChanges();
  }
  onSelect(driver: Driver): void {
    this.selectedDriver = driver;
    this.getDriverPosition().then((pos) => {
      this.InitiateMap(pos);
    });
  }
  getIndex(lines: any) {
    for (let i = 0; i < lines.length; i++) {
      if (Object.keys(lines[i]).indexOf(this.selectedDriver.id) != -1) {
        return i;
      }
    }
    return -1;
  }
  getDriverPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          this.items.subscribe((item) => {
            let index = this.getIndex(item);
            if (index != -1) {
              this.addMarker({
                lng: item[index][this.selectedDriver.id].loc.lng,
                lat: item[index][this.selectedDriver.id].loc.lat,
              });

              resolve({
                lng: item[index][this.selectedDriver.id].loc.lng,
                lat: item[index][this.selectedDriver.id].loc.lat,
              });
            } else {
              reject(false);
            }
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getDriversIds(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.drivers = [];
      this.driversIds = [];
      this.subscription = this.items.subscribe((lines) => {
        lines.forEach((line) => {
          for (let key in line) {
            //this.drivers.push(new Driver(key, "aa"));
            this.driversIds.push(key);
          }
        });

        this._DriversService
          .getDriversNames(this.driversIds)
          .subscribe((res) => {
            res.forEach((element) => {
              this.drivers.push(
                new Driver(
                  element._id,
                  `${element.name.first} ${element.name.last}`
                )
              );
            });
            resolve(true);
          });
      });
    });
  }
  @ViewChild("map") mapView: ElementRef;
  validateSelection() {
    if (this.selectedDriver) {
      return { valid: true };
    }

    return null;
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      matStepLabel: ["", this.validateSelection],
    });
  }
  ngAfterViewInit() {
    this.getDriversIds().then((pos) => {
      this.subscription.unsubscribe();
    });
  }
  InitiateMap(pos) {
    var myLatlng = new google.maps.LatLng(pos.lat, pos.lng);

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
    this.addMarker(pos);
  }
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
}
