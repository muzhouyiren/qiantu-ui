<template>
  <div>
    <div class="weui-gallery" id="gallery">
      <span class="weui-gallery__img" id="galleryImg"></span>
      <div class="weui-gallery__opr">
        <a href="javascript:" class="weui-gallery__del">
          <i class="weui-icon-delete weui-icon_gallery-delete"></i>
        </a>
      </div>
    </div>

    <div class="weui-cells weui-cells_form" id="uploader">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles" @click="handleClickUploadList"></ul>
              <div class="weui-uploader__input-box" v-show='isShowFileInput' >
                <input
                  id="uploaderInput"
                  class="weui-uploader__input"
                  type="file"
                  accept="image/*"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ImgUpload",
  data() {
    return {
      uploadCount: 0,
      isShowFileInput:true
    };
  },
  methods: {
    handleClickUploadList(e) {
      let target = e.target;
      while (!target.classList.contains("weui-uploader__file") && target) {
        target = target.parentNode;
      }
      if (!target) return;
      let url = target.getAttribute("style") || "";
      let id = target.getAttribute("data-id");
      if (url) {
        url = url.match(/url\((.*?)\)/)[1].replace(/"/g, "");
      }
      var gallery = this.$weui.gallery(url, {
        className: "custom-classname",
        onDelete: ()=> {
          --this.uploadCount
          gallery.hide()
          target.remove()
          this.isShowFileInput = true
          this.$emit('delImguploader')
        }
      });
    }
  },
  mounted() {
    let that = this
    this.$weui.uploader("#uploader", {
      url:'http://console.qiantumotor.com/front/drivefun/uploadDriveCard',//http://console.qiantumotor.com/front/drivefun/uploadDriveCard
      auto: true,
      type: "file",
      fileVal: "file",
      compress: {
        width: 1600,
        height: 1600,
        quality: 0.8
      },
      onBeforeQueued: function(files) {
        // `this` 是轮询到的文件, `files` 是所有文件
        if (
          ["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(
            this.type
          ) < 0
        ) {
          that.$weui.alert("请上传图片");
          return false; // 阻止文件添加
        }
        if (this.size > 10 * 1024 * 1024) {
          that.$weui.alert("请上传不超过10M的图片");
          return false;
        }
        if (files.length > 1) {
          // 防止一下子选择过多文件
          that.$weui.alert("最多只能上传1张图片，请重新选择");
          return false;
        }
        if (that.uploadCount + 1 > 1) {
          that.$weui.alert("最多只能上传1张图片");
          return false;
        }
        
        ++that.uploadCount;
        // return true; // 阻止默认行为，不插入预览图的框架
        
        that.isShowFileInput = false
      },
      onQueued: function() {
        // console.log("onQueued", this)
        that.isShowFileInput = false

        // console.log(this.status); // 文件的状态：'ready', 'progress', 'success', 'fail'
        // console.log(this.base64); // 如果是base64上传，file.base64可以获得文件的base64

        // this.upload(); // 如果是手动上传，这里可以通过调用upload来实现；也可以用它来实现重传。
        // this.stop(); // 中断上传

        // return true; // 阻止默认行为，不显示预览图的图像
      },
      onBeforeSend: function(data, headers) {
        // console.log("onBeforeSend", this, data, headers);
        // $.extend(data, { test: 1 }); // 可以扩展此对象来控制上传参数
        // $.extend(headers, { Origin: 'http://127.0.0.1' }); // 可以扩展此对象来控制上传头部

        // return false; // 阻止文件上传
      },
      onProgress: function(procent) {
        // console.log("上传进度", this, procent);
        // return true; // 阻止默认行为，不使用默认的进度显示
      },
      onSuccess: function(ret) {
        // console.log("上传成功", this, ret);
        if(ret.code === '0'){
          that.$emit('imgUploader',ret.data)
        }else{
          that.$weui.alert('上传失败')
        }
        // return true; // 阻止默认行为，不使用默认的成功态
      },
      onError: function(err) {
        // console.log("上传失败", this, err);
        that.$emit('delImguploader')
        that.$weui.alert('上传失败')

        // return true; // 阻止默认行为，不使用默认的失败态
      }
    });
  }
};
</script>

<style lang="stylus" scoped></style>