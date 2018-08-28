import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { FormGroup,FormBuilder, Validators } from '../../../node_modules/@angular/forms';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//Sample
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UploadfilePage } from '../uploadfile/uploadfile';
import { HomePage } from '../home/home';


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
  txtDescription: string;
  txtFirstName: string;
  txtLastName: string;
  txtEmail: string;
  txtPhoneNumber: string;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public provider: PlistarcasosProvider,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
      this.idCaso = navParams.get("idCaso");
      //console.log("this.idCaso: " + this.idCaso);
      this.datos = this.formBuilder.group({
        informacion:['', Validators.required]
      });
  }

  ionViewDidLoad() {
    let _title: string = 'Señor Ciudadano';
    let _subTitle: string = 'Recuerde envié la información que considere relevante para el esclarecimiento de los hechos.';
    let _buttons: string = 'Enterado(a)';
    this.presentAlert(_title, _subTitle, _buttons);
  }
  
  presentAlert(_title, _subTitle, _buttons) {
    let alert = this.alertCtrl.create({
      title: _title,
      subTitle: _subTitle,
      buttons: [_buttons]
    });
    alert.present();
  }

  addContribution(txtDescription: string, txtFirstName: string, txtLastName: string, txtEmail: string, txtPhoneNumber: string){
    if ((txtDescription == null) || (txtDescription == "")) {
      alert("Debe registrar alguna Información...!");
      return false;
    }
    let response: any;
    let objInformant: any = null;
    var _Informant_Id = 1;
    let loader = this.loadingCtrl.create({
      content: "Enviando..."
    });
    loader.present();
    let objContribution: Object  = {
      Contribution_Id: 0,
      Investigation_Id: this.idCaso,
      Description: txtDescription,
      Informant_Id: _Informant_Id
    }
    
    if (txtFirstName != "") {
      //resultadoInformants = this.addInformants(txtFirstName, txtLastName, txtEmail, txtPhoneNumber);
      objInformant = {
      Informant_Id: 0,
      First_Name: txtFirstName,
      Last_Name: txtLastName,
      Email: txtEmail,
      Phone_Number: txtPhoneNumber
      }
      //debugger;
      response = this.provider.PostAddInformantContrib(objInformant, objContribution);      
    } else {
    //debugger;
    response = this.provider.PostAddContributions(objContribution);
    }

    loader.dismiss();
    let _title: string = 'Señor Ciudadano';
    let _subTitle: string = 'Sus aportes fueron enviados satisfactoriamente.';
    let _buttons: string = 'Enterado(a)';
    this.presentToast(_subTitle);    
    this.presentAlert(_title, _subTitle, _buttons);

    this.navCtrl.push(HomePage, {
      
    });

  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  addContributionsFile(id: string, strArchivo: string){
    let response: any;
    let obj: Object  = {
      Contribution_File_Id: 0,
      Contribution_Id: id,
      Path: 'Documents',
      Content_Type: 'image/jpeg',
      File_Doc: strArchivo
    }
    //debugger;
    response = this.provider.PostAddContributionFile(obj);
    return response;
  }

  addInformants(txtFirstName: string, txtLastName: string, txtEmail: string, txtPhoneNumber: string){
    let response: any;
    let obj: Object  = {
      Informant_Id: 0,
      First_Name: txtFirstName,
      Last_Name: txtLastName,
      Email: txtEmail,
      Phone_Number: txtPhoneNumber
    }
    debugger;
    response = this.provider.PostAddInformants(obj);
    return response;
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
  abrirFileUploadPage(txtDescription: string, txtFirstName: string, txtLastName: string, txtEmail: string, txtPhoneNumber: string) {
    if ((txtDescription == null) || (txtDescription == "")) {
      alert("Debe registrar alguna Información...!");
      return false;
    }
    //let resultado: any = this.addContribution(txtDescription,txtFirstName,txtLastName,txtEmail,txtPhoneNumber);
    this.navCtrl.push(UploadfilePage, {
      idCaso: this.idCaso,
      txtDescription:   txtDescription,
      txtFirstName: txtFirstName,
      txtLastName: txtLastName,
      txtEmail: txtEmail,
      txtPhoneNumber: txtPhoneNumber,
    });
  }
  //end sample
}
