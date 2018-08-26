import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { FormGroup,FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//Sample
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UploadfilePage } from '../uploadfile/uploadfile';

@IonicPage()
@Component({
  selector: 'page-contributions',
  templateUrl: 'contributions.html',
})
export class ContributionsPage {
  resultContribution;
  resultContributionFile;
  objContrib: any[] = [];
  datos: any ={};
  idCaso;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public provider: PlistarcasosProvider, private formBuilder: FormBuilder, private imagePicker: ImagePicker) {
      this.idCaso = navParams.get("idCaso");
      //console.log("this.idCaso: " + this.idCaso);
      this.datos = this.formBuilder.group({
        informacion:['', Validators.required]
      });
  }

  ionViewDidLoad() {
    this.presentAlert();    
  }
  
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Señor Ciudadano',
      subTitle: 'Recuerde envié la información que considere relevante para el esclarecimiento de los hechos.',
      buttons: ['Enterado(a)']
    });
    alert.present();
  }

  addContribution(txtDescription: string, txtFirstName: string, txtLastName: string, txtEmail: string, txtPhoneNumber: string){
    let response: any;
    var resultadoInformants;
    var _Informant_Id = 1;
    if (txtFirstName != "") {
      resultadoInformants = this.addInformants(txtFirstName, txtLastName, txtEmail, txtPhoneNumber);
    }
    if (resultadoInformants != null) {
      _Informant_Id = resultadoInformants.Informant_Id;
    }
    let obj: Object  = {
      Contribution_Id: 0,
      Investigation_Id: this.idCaso,
      Description: txtDescription,
      Informant_Id: _Informant_Id
    }

    debugger;
    var resultado = this.provider.PostAddContributions(obj);
    
  }

  addContributionsFile(id: string, strArchivo: string){
    let obj: Object  = {
      Contribution_File_Id: 0,
      Contribution_Id: id,
      Path: 'Documents',
      Content_Type: 'image/jpeg',
      File_Doc: strArchivo
    }
    debugger;
    var resultado = this.provider.PostAddContributionFile(obj);
  }

  addInformants(txtFirstName: string, txtLastName: string, txtEmail: string, txtPhoneNumber: string){
    let obj: Object  = {
      Informant_Id: 0,
      First_Name: txtFirstName,
      Last_Name: txtLastName,
      Email: txtEmail,
      Phone_Number: txtPhoneNumber
    }
    debugger;
    var resultado = this.provider.PostAddInformants(obj);
    return resultado;
  }

  abrirGaleria(){
    let options: ImagePickerOptions = {
      maximumImagesCount:3
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  //Sample from: https://www.djamware.com/post/599da16580aca768e4d2b130/how-to-upload-file-on-ionic-3-using-native-file-transfer-plugin
  // https://github.com/didinj/ionic3-cordova-upload-file
  
  abrirFileUploadPage() {
    this.navCtrl.push(UploadfilePage, {
      idCaso: this.idCaso,
    });
  }
  //end sample
}
