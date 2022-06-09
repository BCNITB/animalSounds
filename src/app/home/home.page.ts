import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { Animal } from 'src/interfaces/animal';
import { ANIMALES_ES } from 'src/data/es.animales';
import { ANIMALES_CA } from 'src/data/ca.animales';
import { ANIMALES_EU } from 'src/data/eu.animales';
import { ANIMALES_GL } from 'src/data/gl.animales';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animales:Animal[]=[];
  audio = new Audio();
  tiempoAudio:any;

  language:string;

  constructor(
    public navCtrl:NavController,
    private _translate: TranslateService
  ) {
    //this.animales=ANIMALES_ES.slice(0);
  }

  ionViewDidEnter(): void {
    this.getDeviceLanguage()
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('ca');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'ca';
    }
    this._translateLanguage();
  }

  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }
    /*else {
      this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => {console.log(e);});
    }*/
  }

  changeLanguage(){
    this._translateLanguage();
    this.selectArray();
  }

  selectArray(){
    if(this.language=="es")
      this.animales=ANIMALES_ES.slice(0);
    else if(this.language=="ca")
      this.animales=ANIMALES_CA.slice(0);
    else if(this.language=="eu")
      this.animales=ANIMALES_EU.slice(0);
    else if(this.language=="gl")
      this.animales=ANIMALES_GL.slice(0);
  }

  reproducir(animal:Animal){
    console.log(animal);

    this.pausarAudio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo=false;
      return;
    }
    
    this.audio.src=animal.audio;
    animal.reproduciendo=true;
    this.audio.load();
    this.audio.play();

    setTimeout(() => {
      animal.reproduciendo=false;
    },
    animal.duracion*100);
  }

  pausarAudio(animalSeleccionado:Animal){
    clearTimeout(this.tiempoAudio);

    this.audio.pause();
    this.audio.currentTime=0;

    for(let animal of this.animales){
      if(animal.nombre != animalSeleccionado.nombre){
        animal.reproduciendo=false;
      }
    }
  }
}
