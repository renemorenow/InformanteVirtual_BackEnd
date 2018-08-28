import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DescriptionPage } from '../description/description';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { Subscriber } from '../../../node_modules/rxjs/Subscriber';

//Pagina details:
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  casos
  idCaso
  constructor(public navCtrl: NavController, public provedor:PlistarcasosProvider) {

  }
  ionViewDidLoad(){
    /* this.provedor.GetInvestigationsWithFile( )
    .subscribe(
      (data)=>{
        this.casos=data;        
      },
      (error)=>{console.log(error);}
    ) */
    //Sin fotos
    this.provedor.GetInvestigations( )
    .subscribe(
      (data)=>{
        this.casos=data;
        this.casos.forEach(element => {
          element.File_Doc = "assets/imgs/inv_" + element.Investigation_Id + "_1.jpg";
          console.log(element.File_Doc);
        });
      },
      (error)=>{console.log(error);}
    )  
  }
  abrirDescription(id) {
    /* console.log('abrirDescription: ' + id);
    this.navCtrl.push(DescriptionPage, {
      idCaso: id,
    }); */
    //console.log('DescriptionPage: ' + id);
    this.navCtrl.push(DetailsPage, {
      idCaso: id,
    });
  }
  obtenerImagen(id){
    console.log(id);
    if (id != null) {
      
      /* this.provedor.GetRowInvestigationFile(id)
      .subscribe(
        (data)=>{
          this.imagen=data[5];
          console.log(data[5]);
          return this.imagen;
        },
        (error)=>{console.log(error);}
      ); */
      return id;
    }
  }

}
