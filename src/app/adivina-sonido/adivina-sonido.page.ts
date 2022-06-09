import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { Sounds } from '../enum/sounds';
import { Images } from '../enum/images';

import { TranslateService } from '@ngx-translate/core';

import { AnimaTxt } from '../enum/anima-txt';
import { Animals } from '../enum/animals';
import { Sentence } from '../enum/sentence';

import { AnimaTxt_ES } from '../enum/es/es.anima-txt';
import { Animals_ES } from '../enum/es/es.animals';
import { Sentence_ES } from '../enum/es/es.sentence';

import { AnimaTxt_CA } from '../enum/ca/ca.anima-txt';
import { Animals_CA } from '../enum/ca/ca.animals';
import { Sentence_CA } from '../enum/ca/ca.sentence';

import { AnimaTxt_EU } from '../enum/eu/eu.anima-txt';
import { Animals_EU } from '../enum/eu/eu.animals';
import { Sentence_EU } from '../enum/eu/eu.sentence';

import { AnimaTxt_GL } from '../enum/gl/gl.anima-txt';
import { Animals_GL } from '../enum/gl/gl.animals';
import { Sentence_GL } from '../enum/gl/gl.sentence';

@Component({
  selector: 'app-adivina-sonido',
  templateUrl: './adivina-sonido.page.html',
  styleUrls: ['./adivina-sonido.page.scss'],
})
export class AdivinaSonidoPage{ 

  audio:any;
  
  nombre = new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('a-zA-Z | *')]);
  
  animal:string;
  randomAnimal = this.randomNum(1,8);
  clue1:boolean=false;
  animalPhrase:string;
  clue2:boolean=false;
  animalImg:any;
  animalAlt:string;
  count:number=0;
  msg:string;
  msgSol:string;
  score:number;
  clue3:boolean=false;
  tries:boolean=false;
  counter:number=0;
  memoryArray:number[];

  language:string;

  constructor(private _translate: TranslateService) {}

  ngOnInit() { }

  ionViewDidEnter(): void {
    this.getDeviceLanguage()
  }

  /*_initialiseTranslation(): void {
    this._translate.get('').subscribe((res: string) => {
      this.title = res;
    });
  }*/

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
    //this._initialiseTranslation();
  }

  start(){
    let animalSound = this.getSound(this.randomAnimal);
    this.reproducir(animalSound);
  }

  randomNum(a,b){
    let p=Math.round(Math.random() * (b-a) + parseInt(a,10));

    this.checkRandom(p);

    return p;
  }

  checkRandom(p){
    for(let i in this.memoryArray){
      if(p==this.memoryArray[i]){
        this.randomNum(1,8);
        break;
      }
      else{
        this.memoryArray.push(p);
      }
    }
  }

  getSound(c){
    return Sounds[c];
  }

  getSentence(c){
    if(this.language=='ca')
      return Sentence_CA[c];
    else if(this.language=='es')
      return Sentence_ES[c];
    else if(this.language=='eu')
      return Sentence_EU[c];
    else if(this.language=='gl')
      return Sentence_GL[c];
    else
      return Sentence_CA[c];
  }

  getImg(c){
    return Images[c];
  }

  getAlt(c){
    if(this.language=='ca')
      return AnimaTxt_CA[c];
    else if(this.language=='es')
      return AnimaTxt_ES[c];
    else if(this.language=='eu')
      return AnimaTxt_EU[c];
    else if(this.language=='gl')
      return AnimaTxt_GL[c];
    else
      return AnimaTxt_CA[c];
  }

  getAnimal(c){
    if(this.language=='ca')
      return Animals_CA[c];
    else if(this.language=='es')
      return Animals_ES[c];
    else if(this.language=='eu')
      return Animals_EU[c];
    else if(this.language=='gl')
      return Animals_GL[c];
    else
      return Animals_CA[c];
  }

  reproducir(c){
    this.audio = new Audio(c);
    this.audio.load();
    this.audio.play();
  }

  askClue1(){
    if(this.clue1){
      this.clue1 = false;
    }
    else{
      this.clue1=true;
    }
    this.count = 1;

    this.animalPhrase = this.getSentence(this.randomAnimal);
  }

  askClue2(){
    if(this.clue2){
      this.clue2 = false;
    }
    else{
      this.clue2=true;
    }
    this.count = 2;

    this.animalImg = this.getImg(this.randomAnimal);
    this.animalAlt = this.getAlt(this.randomAnimal);
  }

  askClue3(){
    this.clue3=true;
    this.count = 3;

    this._translate.get('MSG01').subscribe((res: string) => {
      this.msg = res;
    });

    this._translate.get('LASTMSG').subscribe((res: string) => {
      this.msgSol = res;
    });
    
    this.score=0;

    this.animalImg = this.getImg(this.randomAnimal);
    this.animalAlt = this.getAnimal(this.randomAnimal);
  }

  answer(){
    ++this.counter;
    this.tries=true;

    if(this.counter<=5){
      if(this.animal===this.getAnimal(this.randomAnimal)){
        if(this.count==0){
          this.animalImg = this.getImg(this.randomAnimal);
          this.animalAlt = this.getAnimal(this.randomAnimal);
          this.clue3=true;
          switch(this.counter){
            case 1:
              this.score=15;
              this._translate.get('MSG02').subscribe((res: string) => {
                this.msg = res;
              });
              break;
            case 2:
              this.score=14;
              this._translate.get('MSG03').subscribe((res: string) => {
                this.msg = res;
              });
              break;
            case 3:
              this.score=14;
              this._translate.get('MSG04').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=13;
              break;
            case 4:
              this.score=14;
              this._translate.get('MSG05').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=12;
              break;
            case 5:
              this.score=14;
              this._translate.get('MSG06').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=11;
              break;
          }
        }
        else if(this.count==1){
          this.animalImg = this.getImg(this.randomAnimal);
          this.animalAlt = this.getAnimal(this.randomAnimal);
          this.clue3=true;
          
          switch(this.counter){
            case 1:
              this._translate.get('MSG07').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=10;
              break;
            case 2:
              this._translate.get('MSG08').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=9;
              break;
            case 3:
              this._translate.get('MSG09').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=8;
              break;
            case 4:
              this._translate.get('MSG10').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=7;
              break;
            case 5:
              this._translate.get('MSG11').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=6;
              break;
          }
        }
        else if(this.count==2){
          this.animalImg = this.getImg(this.randomAnimal);
          this.animalAlt = this.getAnimal(this.randomAnimal);
          this.clue3=true;

          switch(this.counter){
            case 1:
              this._translate.get('MSG12').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=5;
              break;
            case 2:
              this._translate.get('MSG13').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=4;
              break;
            case 3:
              this._translate.get('MSG14').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=3;
              break;
            case 4:
              this._translate.get('MSG15').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=2;
              break;
            case 5:
              this._translate.get('MSG16').subscribe((res: string) => {
                this.msg = res;
              });
              this.score=1;
              break;
          }
        }
      }
    }
    else{
      this._translate.get('MSG17').subscribe((res: string) => {
        this.msg = res;
      });
      this.clue3=true;
      this.askClue3();
      this.score=0;
    }
  }

  restart(){
    this.animal=null;
    this.randomAnimal = this.randomNum(1,8);
    this.clue1=false;
    this.clue2=false;
    this.count=0;
    this.clue3=false;
    this.tries=false;
    this.counter=0;
    this.msg=null;
    this.score=0;

    if(this.memoryArray.length==8){
      this.memoryArray=[];
    }
  }
}