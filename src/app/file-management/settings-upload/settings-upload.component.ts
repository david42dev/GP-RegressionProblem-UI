import {Component} from '@angular/core';
import {HttpLibService} from '../../services/http-lib.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-settings-upload',
  templateUrl: './settings-upload.component.html',
  styleUrls: ['./settings-upload.component.css']
})
export class SettingsUploadComponent {
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private httpLibService: HttpLibService, private snackbar: MatSnackBar) {
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.httpLibService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        this.snackbar.open(event, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  downloadExampleTrainingdata() {
    this.httpLibService.downloadExampleTrainingdata().subscribe(response => {
      const file = new Blob([response], {type: 'text'});
      saveAs(file, 'example-training-data.txt');
    });
  }
}
