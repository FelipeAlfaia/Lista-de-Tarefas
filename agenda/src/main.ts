import { bootstrapApplication } from '@angular/platform-browser';

import { createCustomElement } from '@angular/elements';

import { createApplication } from '@angular/platform-browser';

import { TaskCardComponent } from './app/components/task-card/task-card';

import { App } from './app/app';

createApplication({
  providers: []
}).then(appRef => {

  const element = createCustomElement(
    TaskCardComponent,
    {
      injector: appRef.injector
    }
  );

  if (!customElements.get('task-card')) {
    customElements.define('task-card', element);
  }

});

bootstrapApplication(App)
  .catch(err => console.error(err));