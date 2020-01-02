import {Component, Input, OnInit} from '@angular/core';
import {OutputData} from '../../models/OutputData';
import {HttpLibService} from '../../services/http-lib.service';
import * as saveAs from 'file-saver';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-result-export',
  templateUrl: './result-export.component.html',
  styleUrls: ['./result-export.component.css']
})
export class ResultExportComponent implements OnInit {
  @Input() outputData: OutputData[];
  @Input() settingsId: number;

  constructor(private httpLibService: HttpLibService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  downloadTree() {
    console.log('Start download');
    if (this.settingsId === undefined || this.settingsId === null || this.settingsId <= 0) {
      console.log('Download not possible');
      this.snackbar.open('Download not possible - No output available', 'OK', {
        duration: 2000,
      });
    } else {
      console.log(this.outputData);
      this.httpLibService.downloadGPTree(this.settingsId, this.outputData[0].overallBestRun).subscribe(response => {
        const file = new Blob([response], {type: 'text'});
        saveAs(file, 'GPTree.txt');
      });
    }
  }
}
