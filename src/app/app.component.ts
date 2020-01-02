import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SettingsComponent} from './settings/settings.component';
import {OutputData} from './models/OutputData';
import {HttpLibService} from './services/http-lib.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatExpansionPanel} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(SettingsComponent, {static: false}) settingsComponent;
  @ViewChildren(MatExpansionPanel) matExpansionPannel !: QueryList<MatExpansionPanel>;
  outputData: OutputData[] = [];
  inProgress = false;
  settingsid = ' ';

  constructor(private httpLibService: HttpLibService, private snackbar: MatSnackBar) {
  }

  startGP() {
    const settings = this.settingsComponent.settings;
    // validate that functions and terminals are not empty
    if (settings.functions.length > 0 && settings.terminals.length > 0) {
      // set id to 0, because we want to create a new setting object and not update an existing one
      settings.id = 0;
      // Save Settings and then run program
      this.httpLibService.saveSetting(settings).subscribe(res => {
        // If result is equal to an empty object something went wrong
        if (res !== null) {
          console.log('Successfully saved settings object: ');
          console.log(res);
          // Collaps settings, expand output:
          this.matExpansionPannel.first.close();
          this.matExpansionPannel.last.open();
          // reset output data and activate progress spinner
          this.settingsComponent.settings = res;
          this.inProgress = true;
          this.outputData = [];
          this.settingsid = ' ';
          // start GP with settings.id
          this.httpLibService.run(res.id).subscribe(sub => {
            console.log('Finish run');
            console.log(sub);
            this.outputData = sub;
            this.settingsid = res.id.toString();
            this.inProgress = false;
            if (sub.length <= 0) {
              this.snackbar.open('We are sorry - Something went wrong, please try again.', 'OK', {
                duration: 4000,
              });
            }
          });
        } else {
          this.snackbar.open('We are sorry - Something went wrong, please try again and check if the backend is available.', 'OK', {
            duration: 4000,
          });
        }
      });
    } else {
      this.snackbar.open('A minimum of one function and one terminal must be selected', 'OK', {
        duration: 4000,
      });
    }
  }
}
