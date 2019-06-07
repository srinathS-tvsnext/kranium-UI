import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;

}

export const ROUTES: RouteInfo[] = [
    { path: '/Homescreen/Patientlist', title: 'Patient List', icon: 'view_list', class: 'active' },
    { path: '/Homescreen/Inpatientlist', title: 'Patient List', icon: 'view_list', class: '' },
    { path: '/Homescreen/Servicerendered', title: 'Services Rendered', icon: 'person', class: '' },
    { path: '/Homescreen/Managefavourites', title: 'Manage Favourites', icon: 'important_devices', class: '' },
 
    { path: '/Homescreen/Manageforms', title: 'Manage Forms', icon: 'featured_play_list', class: '' },
    { path: '/Homescreen/Master', title: 'Settings', icon: 'perm_data_setting', class: '' }
    
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})


export class SidebarComponent implements OnInit {
    menuItems: any[]; login_name; username; acess_rights;

    constructor(private GlobalService: GlobalService) { }

    ngOnInit() {
        this.acess_rights = JSON.parse(sessionStorage.getItem('user_access_rights'));
        console.log(this.acess_rights);

        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.login_name = JSON.parse(sessionStorage.getItem('logindata'));
        console.log(this.login_name);
    }
    isMobileMenu() {
        debugger;
        if ($(window).width() > 991) {
            return true;
        }
        return true;
    };

}
