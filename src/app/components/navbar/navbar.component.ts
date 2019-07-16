import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { GlobalService } from '../../global.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    titlee;
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;


    constructor(public snackBar: MatSnackBar,private globalService: GlobalService, route: ActivatedRoute, public router: Router, location: Location, private element: ElementRef) { 
        this.location = location;
        this.sidebarVisible = false;
        router.events.subscribe((event) => {
            
            if (event instanceof NavigationEnd) {
            

                if (route.snapshot.firstChild.firstChild && route.snapshot.firstChild.firstChild.data['Key'])
                    this.titlee = route.snapshot.firstChild.firstChild.data['Key'];
                else if (route.snapshot.firstChild.data['Key'])
                    this.titlee = route.snapshot.firstChild.data['Key'];
                else
                    this.titlee = route.snapshot.data['Key'];
            }
        });
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    //    if(this.titlee = 'OP Summary'){
    //         if(this.globalService.viewPatientListPage == true){
    //             this.titlee = 'IP Summary'
    //         } else {
    //             this.titlee = 'OP Summary'
    //         }
    //    }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }

    sidebarOpen() {
        debugger;
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        debugger;
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(2);
        }
        titlee = titlee.split('/').pop();
        console.log(titlee);
        console.log(this.listTitles);


        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path == titlee) {
                return this.listTitles[item].title;
            }
        }
        return titlee;
    }

    signout() {
        if(confirm("Are you sure want's to logout")){
            sessionStorage.clear();
            this.openSnackBar("Thank You for using the application", "Close");
            this.router.navigate(['/Signin']);
        }
        
    }
}
