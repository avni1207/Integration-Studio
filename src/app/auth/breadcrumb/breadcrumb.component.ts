import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  Params,
  PRIMARY_OUTLET
} from '@angular/router';
import 'rxjs/add/operator/filter';

interface BreadCrumbInterface {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'integrate-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: ['.breadcrumb-item.active {color: #333;} .breadcrumb-item + .breadcrumb-item::before {color: #3b99fc;} .breadcrumb {position: relative;top: -10px;}']

})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  // change appereance for spotlight
  @Input()
  public hasLightText: boolean;

  // collection of BreadCrumTypes
  private breadcrumbs: BreadCrumbInterface[];

  // filtered list reference
  private filteredEventsList;

  /**
   * @class BreadcrumbComponent
   * @constructor
   * @description inject dependendancies for ActivatedRoute and Router
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  /**
   * @class BreadcrumbComponent
   * @method ngOnInit
   * @returns void
   * @description subscribe to router events and get breadcrumbs from activated root
   */
  ngOnInit(): void {
    this.filteredEventsList = this.router.events.filter(event => event instanceof NavigationEnd);
    // Subscribe to navigation end
    this.filteredEventsList.subscribe(event => {

      // Set breadcrumbs
      const root: ActivatedRoute = this.activatedRoute.root;
      this.breadcrumbs = this.getBreadcrumbs(root);
    });
  }

  /**
   * @class BreadcrumbComponent
   * @method ngOnDestroy
   * @returns void
   * @description unsubscribe to filteredEventsList
   */
  ngOnDestroy(): void {
    this.filteredEventsList.unsubscribe();
  }

  /**
   * @class BreadcrumbComponent
   * @param  {ActivatedRoute} route
   * @param  {string=''} url
   * @param  {BreadCrumbInterface[]=[]} breadcrumbs
   * @returns IBreadCrumb
   */
  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumbInterface[] = []
  ): BreadCrumbInterface[] {

    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

    // get the child routes
    const children: ActivatedRoute[] = route.children;

    // return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    // iterate over each children
    for (const child of children) {

      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      // verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      // get the route's URL segment
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      // append route URL to URL
      url += `/${routeURL}`;

      // add breadcrumb
      const breadcrumb: BreadCrumbInterface = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };

      breadcrumbs.push(breadcrumb);

      // recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  /**
   * @class BreadcrumbComponent
   * @method trackItems
   * @param  {number} index
   * @description
   * @returns number
   */
  private trackItems(index: number): number {
    return index;
  }

  /**
   * @class BreadcrumbComponent
   * @method isLast
   * @param  {number} i
   * @returns boolean
   * @description return true/false in breadcrum item is last
   */
  private isLast(i: number): boolean {
    return (i === this.breadcrumbs.length - 1);
  }


}
