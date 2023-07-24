import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FileUploaderComponent } from './components/file.uploader/file.uploader.component';
import { ResultViewComponent } from './components/result.view/result.view.component';
import { HttpClientModule } from '@angular/common/http';
import { BalanceFailureComponentComponent } from './components/balance-failure-component/balance-failure-component.component';
import { ReferenceDuplicationFailureComponentComponent } from './components/reference-duplication-failure-component/reference-duplication-failure-component.component';
import { FileParsingFailureComponentComponent } from './components/file-parsing-failure-component/file-parsing-failure-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    ResultViewComponent,
    BalanceFailureComponentComponent,
    ReferenceDuplicationFailureComponentComponent,
    FileParsingFailureComponentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
