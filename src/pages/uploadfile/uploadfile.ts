import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PlistarcasosProvider } from '../../providers/plistarcasos/plistarcasos';
import { File } from '@ionic-native/file';
import { AndroidPermissions } from '@ionic-native/android-permissions';

/* import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation'; */

@Component({
  selector: 'page-uploadfile',
  templateUrl: 'uploadfile.html'
})
export class UploadfilePage {

  imageURI:any;
  imageFileName:any;
  idCaso;
  myphoto:any;
  txtDescription: string;
  txtFirstName: string;
  txtLastName: string;
  txtEmail: string;
  txtPhoneNumber: string;

  constructor(public navCtrl: NavController,
    private transfer: FileTransfer,
    private file: File,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private androidPermissions: AndroidPermissions,
    public navParams: NavParams,
    public provider:PlistarcasosProvider) {
      this.idCaso = navParams.get("idCaso");
      this.txtFirstName = navParams.get("txtFirstName");
      this.txtLastName = navParams.get("txtLastName");
      this.txtEmail = navParams.get("txtEmail");
      this.txtPhoneNumber = navParams.get("txtPhoneNumber");
      //console.log(this.idCaso);

      //Inicio Permisos:
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
      //Fin Permisos      
    }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }


    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Imagen cargada satisfactoriamente");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Imagen cargada satisfactoriamente");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
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


  //SAMPLE TestCamera:
  takePhoto(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.imageFileName = this.myphoto;
    }, (err) => {
      // Handle error
    });
  }
  getImageTestCamera() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.imageFileName = this.myphoto;
    }, (err) => {
      // Handle error
    });
  }
  
  cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
      this.imageFileName = this.myphoto;
    }, (err) => {
      // Handle error
    });
  }
  uploadImage(){
    //Show loading
    /* let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present(); */

    //file transfer action
    /* fileTransfer.upload(this.myphoto, 'http://192.168.1.30/api/upload/uploadFoto.php', options)
      .then((data) => {
        alert("Success");
        loader.dismiss();
      }, (err) => {
        console.log(err);
        alert("Error");
        loader.dismiss();
      }); */
      // this.addContributionsFile(this.idCaso);
      this.addInformantContribWithFile();      
  }
  //End SAMPLE TestCamera:

  /* addContributionsFile(id: string){
    let obj: Object  = {
      Contribution_File_Id: 0,
      Contribution_Id: 2,
      Path: 'Documents',
      Content_Type: 'image/jpeg',
      File_Doc: this.myphoto.toString().substring(23)
    }
    //debugger;
    var resultado = this.provider.PostAddContributionFile(obj);
  } */


  //
  addInformantContribWithFile(){
    if ((this.txtDescription == null) || (this.txtDescription == "")) {
      alert("Debe registrar alguna Información...!");
      return false;
    }
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    let response: any;
    let objInformant: any = null;
    
    if (this.txtFirstName != "") {
      objInformant = {
        Informant_Id: 0,
        First_Name: this.txtFirstName,
        Last_Name: this.txtLastName,
        Email: this.txtEmail,
        Phone_Number: this.txtPhoneNumber
      }
    }
    
    let objContribution: any = {
      Contribution_Id: 0,
      Investigation_Id: this.idCaso,
      Description: this.txtDescription,
      Informant_Id: 1
    }
      
    let objContributionFile: any = {
      Contribution_File_Id: 0,
      Contribution_Id: 0,
      Path: 'Documents',
      Content_Type: 'image/jpeg',
      File_Doc: this.myphoto.toString().substring(23)
    }
    response = this.provider.PostAddInformantContribWithFile(objInformant,objContribution,objContributionFile);
    loader.dismiss();
    this.presentToast("Sus aportes fueron cargados satisfactoriamente.");
    return response;
  }
  //
  
}
