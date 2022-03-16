import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';

import { Sounds } from '../enum/sounds';
import { Sentence } from '../enum/sentence';
import { Images } from '../enum/images';
import { AnimaTxt } from '../enum/anima-txt';
import { Animals } from '../enum/animals';

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

  constructor() {}

  ngOnInit() { }

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
    return Sentence[c];
  }

  getImg(c){
    return Images[c];
  }

  getAlt(c){
    return AnimaTxt[c];
  }

  getAnimal(c){
    return Animals[c];
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

    this.msg="¡Mejor suerte la próxima! No te preocupes, nadie acierta siempre y este animal es muy escurridizo. ";
    this.msgSol="El animal escondido era: "
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
              this.msg="¡Puntuación Perfecta! No te ha hecho falta ninguna pista para adivinar que el animal escondido es ";
              break;
            case 2:
              this.score=14;
              this.msg="¡Puntuación casi Perfecta! No te ha hecho falta ninguna pista para adivinar el animal escondido, aunque sí más de un intento. El animal escondido es ";
              break;
            case 3:
              this.msg="¡A la tercera va la vencida! No te ha hecho falta ninguna pista para adivinar el animal escondido, aunque sí tres intentos para adivinar que el animal escondido es ";
              this.score=13;
              break;
            case 4:
              this.msg="¡A la cuarta! No te ha hecho falta ninguna pista para adivinar el animal escondido, aunque sí cuatro intentos para adivinar que el animal escondido es ";
              this.score=12;
              break;
            case 5:
              this.msg="¡Por poco! No te ha hecho falta ninguna pista para adivinar el animal escondido, aunque deberías haberlas pedido. El animal escondido es ";
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
              this.msg="¡No está mal! Te ha hecho falta una pequeña pista para adivinar que el animal escondido es ";
              this.score=10;
              break;
            case 2:
              this.msg="¡A la segunda! Te ha hecho falta una pequeña pista y dos intentos para adivinar que el animal escondido es ";
              this.score=9;
              break;
            case 3:
              this.msg="¡A la tercera va la vencida! Te ha hecho falta una pequeña pista y tres intentos para adivinar que el animal escondido es ";
              this.score=8;
              break;
            case 4:
              this.msg="¡Te has arriesgado! Te ha hecho falta una pequeña y cuatro pistas pista para adivinar que el animal escondido es ";
              this.score=7;
              break;
            case 5:
              this.msg="¡Sobre el alero! Te ha hecho falta una pequeña pista, ¿porqué no has pedido alguna? El animal escondido es ";
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
              this.msg="¡Hemos de afinar más el oído! Te han hecho falta las dos pistas para adivinar que el animal escondido es ";
              this.score=5;
              break;
            case 2:
              this.msg="¡Los dos patitos! Te han hecho falta las dos pistas y dos intentos para adivinar que el animal escondido es ";
              this.score=4;
              break;
            case 3:
              this.msg="¡Debes mejorar! Te han hecho falta las dos pistas y tres intentos para adivinar que el animal escondido es ";
              this.score=3;
              break;
            case 4:
              this.msg="¡Aix..! Te han hecho falta las dos pistas para adivinar y cuatro intentos que el animal escondido es ";
              this.score=2;
              break;
            case 5:
              this.msg="¡Te gusta el riesgo! Por poco pero lo has logrado ¡Así me gusta! El animal escondido es ";
              this.score=1;
              break;
          }
        }
      }
    }
    else{
      this.msg="Ya no tienes más intentos.";
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