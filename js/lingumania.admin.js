(function (w, d, u) {
    function getQSParameterByName(name, searchString) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(searchString);
        if (results == null)
            return "";
        else
            return results[1];
    }

    function buildAdminWidget() {
        if (linguRespA) {
            var isPreview = w.location.href.toLowerCase().indexOf("lingulang=") != -1;
            var adminMenu = d.createElement("div");
            adminMenu.id = "lingumania_adminwidget";
            adminMenu.className = "notranslate";
            var imgLogo = d.createElement("img");
            imgLogo.border = "0";
            imgLogo.src = pluginBaseUrl + "/images/lingu.png";
            adminMenu.appendChild(imgLogo);
            var utm = "";
            if (!isPreview) {
                utm = "?utm_source=wp-widget-" + linguRespA.project_url + "&utm_medium=website&utm_campaign=";
                var img = d.createElement("img");
                img.src = "//www.google-analytics.com/collect?v=1&tid=UA-33195837-1&cid=" + linguRespA.project_url + "&t=event&ec=wp-widget&ea=" + linguRespA.project_url + "&el=" + linguRespA.project_url + "&cs=wp-widget-" + linguRespA.project_url + "&cm=website&cn=";
                adminMenu.appendChild(img);
            }

            var languagesItems = linguRespA.languages;
            if (languagesItems.length > 0) {
                var menuHeight = 0;
                for (var i = 0; i < languagesItems.length; i++) {
                    if (i > 0) {
                        var langItem = d.createElement("a");
                        langItem.innerHTML = languagesItems[i].label;
                        langItem.href = "http://www.lingumania.com/preview?lingulang=" + languagesItems[i].lang_code + "&lingurl=" + (isPreview ? getQSParameterByName("lingurl", w.location.href) : encodeURIComponent(w.location.href)) + utm.replace('?', '&');
                        langItem.className = "lingumania_admintarget";
                        langItem.target = "_blank";
                        adminMenu.appendChild(langItem);
                        menuHeight += 30;
                    }
                }

                var translateNowItem = d.createElement("a");
                translateNowItem.className = "lingumania_translatenow";
                translateNowItem.href = "http://www.lingumania.com/translate/?url=" + (isPreview ? getQSParameterByName("lingurl", w.location.href) : encodeURIComponent(w.location.href)) + utm.replace('?', '&');
                translateNowItem.innerHTML = "Translate Now";
                translateNowItem.target = "_blank";
                adminMenu.appendChild(translateNowItem);
                menuHeight += 30;

                var translationOptionsItem = d.createElement("a");
                translationOptionsItem.className = "lingumania_translationoptions";
                translationOptionsItem.href = "https://www.lingumania.com/projects/admin/" + linguRespA.project_url + utm;
                translationOptionsItem.innerHTML = "Translation Options";
                translationOptionsItem.target = "_blank";
                adminMenu.appendChild(translationOptionsItem);
                menuHeight += 30;

                if (adminMenu.addEventListener) {
                    adminMenu.addEventListener("mouseover", function (event) {
                        d.getElementById('lingumania_adminwidget').style.height = menuHeight + 'px';
                    });
                    adminMenu.addEventListener("mouseout", function (event) {
                        setTimeout(function () { d.getElementById('lingumania_adminwidget').style.height = '30px'; }, 1000)
                    });
                } else {
                    adminMenu.attachEvent("onmouseover", function (event) {
                        d.getElementById('lingumania_adminwidget').style.height = menuHeight + 'px';
                    });
                    adminMenu.attachEvent("onmouseout", function (event) {
                        setTimeout(function () { d.getElementById('lingumania_adminwidget').style.height = '30px'; }, 1000)
                    });
                }

                d.body.insertBefore(adminMenu, d.body.firstChild);
            }
        } else {
            var adminMenu = d.createElement("div");
            adminMenu.id = "lingumania_adminwidget";
            adminMenu.className = "notranslate";
            var imgLogo = d.createElement("img");
            imgLogo.border = "0";
            imgLogo.src = pluginBaseUrl + "/images/lingu.png";
            adminMenu.appendChild(imgLogo);


            var pleaseRegisterItem = d.createElement("a");
            pleaseRegisterItem.className = "lingumania_admintarget";
            pleaseRegisterItem.style.textTransform = "initial";
            pleaseRegisterItem.href = "https://www.lingumania.com/projects/new";
            pleaseRegisterItem.innerHTML = "To start using this plugin please register your site at https://www.lingumania.com/projects/new";
            pleaseRegisterItem.target = "_blank";
            adminMenu.appendChild(pleaseRegisterItem);
            menuHeight += 30;

            if (adminMenu.addEventListener) {
                adminMenu.addEventListener("mouseover", function (event) {
                    d.getElementById('lingumania_adminwidget').style.height = menuHeight + 'px';
                });
                adminMenu.addEventListener("mouseout", function (event) {
                    setTimeout(function () { d.getElementById('lingumania_adminwidget').style.height = '30px'; }, 1000)
                });
            } else {
                adminMenu.attachEvent("onmouseover", function (event) {
                    d.getElementById('lingumania_adminwidget').style.height = menuHeight + 'px';
                });
                adminMenu.attachEvent("onmouseout", function (event) {
                    setTimeout(function () { d.getElementById('lingumania_adminwidget').style.height = '30px'; }, 1000)
                });
            }

            d.body.insertBefore(adminMenu, d.body.firstChild);
        }
    }


    var linguAdminLoader = function () {
        var isPreview = w.location.href.toLowerCase().indexOf("lingulang=") != -1;
        var script = d.createElement("script"), tag = d.getElementsByTagName("script")[0];
        script.src = "//www.lingumania.com/api/1/percentages?va=1&url=" + (isPreview ? getQSParameterByName("lingurl", w.location.href) : encodeURIComponent(w.location.href));
        script.type = "text/javascript";
        script.async = true;
        script.onreadystatechange = function () {
            if (d.readyState == 'complete' || d.readyState == 'loaded') {
                buildAdminWidget();
            }
        };
        script.onload = buildAdminWidget;
        tag.parentNode.insertBefore(script, tag);

        var cssCode = "a.lingumania_admintarget, a.lingumania_translatenow, a.lingumania_translationoptions { display: none; background-color: #777; } a.lingumania_admintarget:hover, a.lingumania_translatenow:hover, a.lingumania_translationoptions:hover { background-color: #000; } #lingumania_adminwidget{ position: fixed; top: 120px; right: 0px; z-index: 100003; text-transform: uppercase; text-align: left; color: #fff; font-size: 12px; line-height: 18px; } #lingumania_adminwidget:hover a { display: block; position: relative; z-index: 100004; float: right; width: 160px; padding: 5px; clear: both; color: #fff; text-decoration: none; } #lingumania_adminwidget:hover img { display: none; } .lingumania_translatenow { font-weight: bold; background: url('" + pluginBaseUrl + "/images/lingumania.png') right center no-repeat; border-top: 1px solid #808080; } .lingumania_translationoptions { background: url('" + pluginBaseUrl + "/images/settings.png') 98% center no-repeat; }";
        var style = d.createElement('style');
        style.type = "text/css";
        if (style.styleSheet)
            style.styleSheet.cssText = cssCode;
        else
            style.innerHTML = cssCode;

        script.parentNode.insertBefore(style, script);
    };

    w.addEventListener ? w.addEventListener("load", linguAdminLoader, false) : w.attachEvent("onload", linguAdminLoader);
} (window, document));
