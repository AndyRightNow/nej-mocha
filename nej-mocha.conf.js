module.exports = {
  globals: {
    URSLoginConfig: {
      product: 'imooc',
      promark: 'cjJVGQM',
      host: 'www.icourse163.org',
      cookieDomain: 'icourse163.org',
      skin: 3,
      page: 'login',
      needUnLogin: 1,
      defaultUnLogin: 1,
      placeholder: {
        account: '常用邮箱或网易邮箱',
        pwd: '密码'
      },
      needPrepare: 1,
      regUrl: 'http://zc.reg.163.com/regInitialized?pd=imooc&pkid=YeaYYzQ&pkht=www.icourse163.org',
      coverBackground: 'background:-webkit-radial-gradient(center,rgba(0,0,0,0.3),#000 75%);',
      single: 1,
      cssDomain: 'http://cmc.stu.126.net/u/css/cms/',
      cssFiles: 'urs4moocweb.css',
      frameSize: {
        'width': 380,
        'height': 282
      },
      logincb: function (cb) {}
    },
    imageUrlMap: {
      loading_circle_gif: '/res/images/ui/loading_circle.gif',
      share_sprite: '/res/images/ui/shareUI.png',
      ui_sprite: '/res/images/ui/ui_sprite.png',
      forum_icon_sprite: '/res/images/ui/forum_icon.png',
      image_upload_swf: '/res/swf/imageUpload.swf',
      image_pdf_swf: '/res/swf/pdfReader.swf',
      image_video_swf: 'http://${moocStaticHost}/res/swf/moocPlayer.swf',
      img_upd_select_swf: '/res/swf/DragCutUpload_mooc.swf',
      img_default_big_head: 'http://edu-image.nosdn.127.net/457BE69DFFF1A6157EAF6D44EA2D8662.png?imageView&thumbnail=180y180&quality=100',
      img_default_small_head: '/res/images/common/headImg/small.jpg',
      img_default_unviersity_1: '/res/images/common/default/university1.png',
      img_default_unviersity_2: '/res/images/common/default/university2.png',
      img_default_unviersity_3: '/res/images/common/default/university3.png',
      img_default_unviersity_cert: '/res/images/common/default/universityCert.png',
      img_default_course: '/res/images/common/default/course.jpg',
      img_default_signature: '/res/images/common/signature_example.png',
      img_step_score_mail: '/res/images/common/step_score_mail.jpg'
    },
    urlPrefix: {
      indexPrefix: '/',
      homePrefix: '/home.htm',
      loginPrefix: '/member/login.htm',
      logoutPrefix: '/passport/member/logout.htm',
      searchPrefix: '/search.htm',
      courseListPrefix: '/category/all',
      universityListPrefix: '/university/view/all.htm',
      universityPrefix: '/university/',
      universityPreviewPrefix: '/university/preview/',
      vocationIndexPrefix: '/vemooc',
      courseInfoPrefix: '/course/',
      courseInfoPreviewPrefix: '/course/preview/',
      courseLearnPrefix: '/learn/',
      courseLearnPreviewPrefix: '/learn/preview/',
      courseLearnReviewPrefix: '/learn/review/',
      learnForTeacherPrefix: '/learn/enroll/',
      spocMainPrefix: '/spoc/schoolcloud/index.htm',
      spocCourseInfoPrefix: '/spoc/course/',
      spocCourseLearnPrefix: '/spoc/learn/',
      spocUsityIdPrefix: '/spoc/university.htm?schoolId=',
      spocUniversityListPrefix: '/university/view/all.htm',
      spocUniversityPrefix: '/spoc/university/',
      spocUniversityPreviewPrefix: '/spoc/university/preview/',
      spocMemberPrefix: '/spoc/u/',
      spocMemberPreviewPrefix: '/spoc/u/preview/',
      memberPrefix: '/u/',
      memberPreviewPrefix: '/u/preview/',
      addMemberInfoPrefix: 'http://www.icourse163.org/member/addMemberInfo.htm',
      partnerSuperAdminPrefix: '/partnerAdmin/superAdmin.htm',
      partnerEditorAdminPrefix: '/partnerAdmin/editorAdmin.htm',
      adminManagerPrefix: '/collegeAdmin/schoolPanel.htm',
      adminTeacherPrefix: '/collegeAdmin/teacherPanel.htm',
      coursecreatePrefix: '/collegeAdmin/courseCreate.htm',
      adminSetMessagePrefix: '/collegeAdmin/setMessage.htm',
      adminSettingPrefix: '/collegeAdmin/setting.htm',
      adminToolsPrefix: '/collegeAdmin/tools.htm',
      termManagePrefix: '/collegeAdmin/termManage/',
      reviewQuizPrefix: '/review/quiz/{id}.htm',
      reviewHwPrefix: '/review/hw/',
      reviewTrainPrefix: '/review/train/',
      teacherMainEditPrefix: '/user/teacherMainEdit.htm',
      personInfoSettingPrefix: '/user/setting/personInfoEdit.htm',
      accountSettingPrefix: '/user/setting/accountSetting.htm',
      attachmentPrefix: '/homework/attachment.htm',
      titleAttachmentPrefix: '/question/title/attachment.htm',
      notSupportedPrefix: '/common/errors/notSupported.htm',
      helpFrontPrefix: '/help/help.htm',
      helpBackIndexPrefix: '/help/helpIndex.htm',
      helpBackPrefix: '/help/manageHelp.htm',
      aboutUsPrefix: '/about/aboutus.htm',
      contactUsPrefix: '/about/contactus.htm',
      certApplyPrefix: '/cert/apply.htm',
      certDesignPrefix: '/cert/certDesign/{id}.htm',
      chargeCertDesignPrefix: '/cert/chargeCertDesign/{id}.htm',
      payOrderPrefix: '/pay/order.htm',
      donateCoursePrefix: '/donate/course.htm',
      getTextPrefix: '/resource/getText.htm',
      cdnReportPrefix: 'http://study.163.com/about/cdnReport.htm',
      snsOAuthPrefix: '/passport/sns/doOAuth.htm',
      ursAuthorPrefix: 'http://www.icourse163.org/member/ursLogin.htm',
      thirdBindCallbackHref: 'http://www.icourse163.org/logingate/urs/bindCallback.htm',
      icourseAuthorPrefix: 'http://www.icourse163.org/member/icourseLogin.htm'
    },
    moocHost: 'icourse163.org',
    moocHref: 'http://www.icourse163.org',
    moocStaticHost: 'mc.stu.126.net',
    callAppDownloadHref: 'http://www.icourse163.org/client/callAppDownload.htm'
  },
  entries: [
    // "./src/javascript/web/**/enrolledCourse/test/**/*.spec.js",
    './src/javascript/web/**/coursePanel/test/'
    // "./src/javascript/web/**/followModal/test/**/*.spec.js",
    // "./test/**/*.spec.js",
  ],

  nejPathAliases: {
    pro: 'src/javascript/',
    eui: 'src/javascript/lib/edu-front-ui/src/js/',
    rui: 'src/javascript/lib/edu-front-regularUI/src/js/',
    eutil: 'src/javascript/common/util/',
    pool: 'src/javascript/lib/',
    testutil: 'test/util',
    testconfig: 'test/config'
  },
  mochaOptions: {
    timeout: 110000,
    useColors: true,
    reporter: 'spec'
  },
  // proxy: {
  //     host: "www.icourse163.org",
  //     port: 80
  // },
  testRunnerPort: 8004,
  shouldBrowserClosed: true,
  headless: true,
  scriptsToInject: [
    './src/javascript/lib/regularjs/dist/regular.min.js'
  ],
  coverage: true,
  coverageOptions: {
    reporters: [
      'lcov',
      'text'
    ]
  },
  inject: [
    {
      pattern: /pro\/common\/\w+\/timeUtil/,
      path: 'pro/test/new'
    },
    {
      pattern: 'pro/test/new',
      path: 'pro/test/new1'
    }
  ]
}
