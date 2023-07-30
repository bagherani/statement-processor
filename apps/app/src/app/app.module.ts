import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FileUploaderComponent } from './components/file-uploader/file.uploader.component';
import { ResultViewComponent } from './components/result-view/result.view.component';
import { HttpClientModule } from '@angular/common/http';
import { BalanceFailureComponent } from './components/balance-failure/balance-failure.component';
import { ReferenceDuplicationFailureComponent } from './components/reference-duplication-failure/reference-duplication-failure.component';
import { FileParsingFailureComponent } from './components/file-parsing-failure/file-parsing-failure.component';
import { ValidateService } from './services/validate.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    ResultViewComponent,
    BalanceFailureComponent,
    ReferenceDuplicationFailureComponent,
    FileParsingFailureComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [ValidateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
