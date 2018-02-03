define(function (require, exports, module) {
   
    function ajaxUploader(config){
        var me=this,isUploading=false,formData =new FormData(),
            fileInput=document.createElement('input');
        fileInput.type='file';
        fileInput.accept='image/jpeg,image/png';
        // fileInput.style.position='absolute';
        // fileInput.style.left='0';
        // fileInput.style.top='0';
        // fileInput.style.width='100%';
        // fileInput.style.height='100%';
        // fileInput.style.opacity='0';

        this.dom=config.dom;
        this.url=config.url;
        this.uploadsuccess = config.uploadsuccess;
        this.uploaderror = config.uploaderror;
        this.onchange = config.onchange ;

        fileInput.addEventListener("change", function () {
            getImageWH(fileInput.files[0],me.onchange);
        }, false);
        function getImageWH(imgFile,cb){
            var obj={name:imgFile.name,size:imgFile.size};
            if(!(imgFile instanceof File)){
                console.error('不是文件对象');return;
            }
            var FR=new FileReader(),img=document.createElement('img');
            FR.onloadstart=function(e){console.log('读取本地图片文件开始');};
            FR.onload=function(e){
                console.log('读取本地图片完毕');
                img.src=e.target.result;
                obj.width=img.width;obj.height=img.height;
                cb(obj);
            };
            FR.readAsDataURL(imgFile);
        }

        this.addPostData=function(k,v){formData.append(k,v)};
        this.upload=function(){
            if(isUploading){return}
            var xhr=new XMLHttpRequest();
            formData.append('file',fileInput.files[0]);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {isUploading=false;
                    if(xhr.status == 200) {me.uploadsuccess(xhr.response , me.dom)}
                    else{me.uploaderror()}
                }
            };
            xhr.open('POST',this.url);
            xhr.send(formData);
            isUploading=true;
        };
        this.reset=function(){
            isUploading = false;
            fileInput.value = "";
            formData = new FormData();
        };
        this.dom.appendChild(fileInput);
    }

    exports.ajaxUploader = ajaxUploader;
});