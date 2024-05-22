
import { ThemePalette } from '@angular/material/core';

export interface Filter {
    name: string;
    value: string;
    completed: boolean;
    color: ThemePalette;
    subfilter?: Filter[];
}