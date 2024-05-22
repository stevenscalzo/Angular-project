import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Filter } from '../../../interfaces/filter';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { WebsService } from '../../../services/webs.service';
import { Web } from '../../../interfaces/web';

@Component({
  selector: 'product-filter',
  standalone: true,
  imports: [MatExpansionModule, MatCheckboxModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss'
})
export class ProductFilterComponent implements OnInit {
  filter: Filter = {
    name: 'All',
    value: "All",
    completed: false,
    color: 'primary'
  };
  filtersLabels: { [key: string]: string } = {
    'web': 'Web',
    'price': 'Precio'
  };
  @Input({required: true}) data!: any[];
  @Input({required: true}) type!: string;
  @Output() selectionChanged = new EventEmitter<any>();

  #websService = inject(WebsService);

  allComplete: boolean = false;
  ranges: number[][] = [];
  selectedValues: any[] = [];

  ngOnInit(): void {
    this.setFilterData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setFilterData();
  }

  setFilterData(){
    if(this.type == "web") {
      this.filterByWeb();
     } else if(this.type == "price") {
       this.filterByPrice();
     }
  }

  onCheckboxChange(value: any) {
    if (this.selectedValues.includes(value)) {
      this.selectedValues = this.selectedValues.filter(item => item !== value);
    } else {
      this.selectedValues.push(value);
    }

    this.allComplete = this.filter.subfilter != null && this.filter.subfilter.every(t => t.completed);

    this.selectionChanged.emit(this.selectedValues);
  }

  filterByPrice() {
    let subfilters: Filter[] = [];
    this.setRanges();
    this.ranges.forEach(element => {
      let name = element[0] + "€ - " + element[1] + "€";
      let value =  element[0] + "-" + element[1];

      subfilters.push({ name: name, value: value, completed: false, color: 'primary' }) 
    });

    this.filter.subfilter = subfilters;
  }

  setRanges() {
    this.ranges = [];
    const sortedData = this.data.sort((a, b) => a - b);
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];
    const range = max - min;
  
    const numRanges = Math.min(Math.max(3, Math.floor(sortedData.length / 10)), 6);
    const intervalSize = Math.ceil(range / numRanges);
  
    let lowerBound = min;

    for (let i = 0; i < numRanges; i++) {
      let upperBound = lowerBound + intervalSize;
      upperBound = Math.min(upperBound, max);
      this.ranges.push([Math.ceil(lowerBound), Math.ceil(upperBound)]);
      lowerBound = upperBound;
    }
  
    this.ranges[numRanges - 1][1] = max;
  }

  filterByWeb() {
    let subfilters: Filter[] = [];
    let webs: Web[] = [];
    
    this.#websService.getWebs().subscribe((websResponse) => {
      webs = websResponse;

      this.data.forEach(element => {
        let web: Web | undefined = webs.find(web => web._id == element);
  
        subfilters.push({ name: web!.name, value: element.toString(), completed: false, color: 'primary' }) 
      });
  
      this.filter.subfilter = subfilters;
    });
  }
}
