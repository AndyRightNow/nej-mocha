NEJ.define([
    'base/platform',
	'base/element',
    'base/event',
	'base/util',
	'./editor.js'
],function(_m,_e,_v,_u,_h,_p,_o,_f,_r){
	// webkit editor patch
	NEJ.patch('WV',function(){
	    var __reg_nwrd = /<\/?[\w]+:[\w]+.*?>/gi;
	    /**
	     * 验证webkit下内容是否来自Word
	     * @param  {String} _html 内容
	     * @return {Boolean}      FF下内容是否来自Word
	     */
	    var __isFromWord = function(_html){
	        return (_html||'').search('</?[\\w]+:[\\w]+.*?>')>=0;
	    };

	    /**
	     * webkit清除word过来的冗余内容
	     * @param  {String} _html 内容
	     * @return {String} 过滤后的内容
	     */
	    _h.__filterWordContent = function(_html){
	        if(!__isFromWord(_html))
	            return _html;
	        return _html.replace(__reg_nwrd,'');
	    };
	});

	// gecko editor patch
	NEJ.patch('GV',function(){
	    /**
	     * 基本内容过滤
	     */
	    var __empty    = /(?:<(p|div)>(?:\&nbsp\;|<br\/?>)<\/\1>|<br\/?>|\&nbsp\;|\s)+$/gi,
	        __reg_flnh = /\f/g,//换页符
	        __reg_flns = /\n|\r/g,//换行符或回车符
	        __reg_fzag = /<(style|script).*?>.*?<\/\1>/gi,//style和script标签
	        __reg_ftag = /<\/?(?:meta|link|!--\[.+?\]--|[\w]+:[\w]+).*?>/gi,
	        __reg_fimg = /<img(\n|\r|\s|[^>])*?src="data:image\/png;base64[^>]*?>/gi;//FF需要干掉base64的图片数据
	    /**
	     * 验证gecko下内容是否来自Word
	     * @param  {String}  _html 内容
	     * @return {Boolean} gecko下内容是否来自Word
	     */
	    var __isFromWord = function(_html){
	        return (_html||'').indexOf('<w:WordDocument>')>=0;
	    };

	    /**
	     * gecko清除word过来的冗余内容
	     * @param  {String} _html 内容
	     * @return {String} 过滤后的内容
	     */
	    _h.__filterWordContent = function(_html){
	        if(!__isFromWord(_html))
	            return _html;
	        return _html.replace(__reg_flns,'\f')
	                    .replace(__reg_ftag,'')
	                    .replace(__reg_fzag,'')
	                    .replace(__reg_flnh,'\n')
	                    .replace(__reg_fimg,'')
	                    .replace(__empty,'');
	    };

	    /**
	     * gecko特殊过滤
	     * @param {Object} _html
	     */
	    _h.__filterContentPath = function(_html){
	        _html = _html.replace(__reg_fimg,'');//过滤掉源数据是base64内容的图片
	        return _html;
	    };

        /**
         * 插入html命令处理
         * @param {Object} _document 文档对象
         * @param {Object} _html
         */
        _h.__insertHtml = function(_doc,_html){
            // inserthtml for gecko
            var _win = _h.__getWindow(_doc),
                _range = _h.__getRange(_win);
            var _node = _doc.createElement('div');
            _node.innerHTML = _html;
            // insert content
            _range.deleteContents();
            _u._$reverseEach(
                _node.childNodes,
                function(_elm){
                    _range.insertNode(_elm);
                }
            );
            // set focus
            var _selection = _h.__getSelection(_win);
            _selection.collapseToEnd();
            _win.focus();
        };

        /**
         * FF模拟selectionChange
         * @param {Object} _document 文档对象
         */
        _h.__supportSelectionChange = (function(){
            var MAC = /^Mac/.test(navigator.platform),
                MAC_MOVE_KEYS = [65, 66, 69, 70, 78, 80],
                SELECT_ALL_MODIFIER = MAC ? 'metaKey' : 'ctrlKey',
                RANGE_PROPS = ['startContainer', 'startOffset', 'endContainer', 'endOffset'],
                HAS_OWN_SELECTION = {INPUT: 1, TEXTAREA: 1},
                _ranges;
            /**
             * 判断是否有WeakMap
             */
            var _newWeakMap = function(){
                if (typeof WeakMap !== 'undefined') {
                    return new WeakMap();
                } else {
                    return null;
                }
            };
            /**
             * 闭合光标
             * @param {Object} _document 文档对象
             */
            var _getSelectionRange = function(_document){
                var _selection = _h.__getSelection(_h.__getWindow(_document));
                return _selection.rangeCount ? _selection.getRangeAt(0) : null;
            };
            /**
             * input事件
             * @param  {Event} _event 事件对象
             */
            var _onInput = function(_event){
                if (!HAS_OWN_SELECTION[_event.target.tagName]) {
                    _dispatchIfChanged(this, true);
                }
            };
            /**
             * keydown事件
             * @param  {Event} _event 事件对象
             */
            var _onKeyDown = function(_event){
                var _code = _event.keyCode;
                if (_code === 65 && _event[SELECT_ALL_MODIFIER] && !_event.shiftKey && !_event.altKey || // Ctrl-A or Cmd-A
                    _code >= 37 && _code <= 40 || // arrow key
                    _event.ctrlKey && MAC && MAC_MOVE_KEYS.indexOf(_code) >= 0) {
                  if (!HAS_OWN_SELECTION[_event.target.tagName]) {
                    setTimeout(_dispatchIfChanged.bind(null, this), 0);
                  }
                }
            };
            /**
             * mousedown事件
             * @param  {Event} _event 事件对象
             */
            var _onMouseDown = function(_event){
                if (_event.button === 0) {
                    _v._$addEvent(this,'mousemove',_onMouseMove);
                    setTimeout(_dispatchIfChanged.bind(null, this), 0);
                }
            };
            /**
             * mousemove事件
             * @param  {Event} _event 事件对象
             */
            var _onMouseMove = function(_event){
                if (_event.buttons & 1) {
                    _dispatchIfChanged(this);
                } else {
                    _v._$delEvent(this, 'mousemove', _onMouseMove);
                }
            };
            /**
             * mouseup事件
             * @param  {Event} _event 事件对象
             */
            var _onMouseUp = function(_event){
                if (_event.button === 0) {
                    setTimeout(_dispatchIfChanged.bind(null, this), 0);
                } else {
                    _v._$delEvent(this, 'mousemove', _onMouseMove);
                }
            };
            /**
             * focus事件
             */
            var _onFocus = function(){
                setTimeout(_dispatchIfChanged.bind(null, this.document), 0);
            };
            /**
             * 触发selectionchange
             * @param {Object} _document 文档对象
             * @param  {Event} _event 事件对象
             */
            var _dispatchIfChanged = function(_document,_force){
                var _r = _getSelectionRange(_document);
                if (_force || !_sameRange(_r, _ranges.get(_document))) {
                    _ranges.set(_document, _r);
                    setTimeout(function(){
                        console.log('selectionchange')
                        _v._$dispatchEvent(_document,'selectionchange');
                    }, 0);
                }
            };
            /**
             * 判断光标是否相同
             * @param  {Range} r1 光标对象
             * @param  {Range} r2 光标对象
             */
            var _sameRange = function(_r1,_r2){
                return _r1 === _r2 || _r1 && _r2 && RANGE_PROPS.every(function (_prop) {
                    return _r1[_prop] === _r2[_prop];
                });
            }
            /**
             * 是否支持selectionchange
             * @param {Object} _document 文档对象
             */
            var _hasNativeSupport = function(_document){
                var _osc = _document.onselectionchange;
                if (_osc !== undefined) {
                    try {
                        _document.onselectionchange = 0;
                        return _document.onselectionchange === null;
                    } catch (e) {
                    } finally {
                        _document.onselectionchange = _osc;
                    }
                }
                return false;
            };
            return function(_document){
                var _d = _document || document;
                if (_ranges || !_hasNativeSupport(_d) && (_ranges = _newWeakMap())){
                    if (!_ranges.has(_d)) {
                        _ranges.set(_d, _getSelectionRange(_d));
                        _v._$addEvent(_d,'input',_onInput);
                        _v._$addEvent(_d,'keydown',_onKeyDown);
                        _v._$addEvent(_d,'mousedown',_onMouseDown);
                        _v._$addEvent(_d,'mousemove',_onMouseMove);
                        _v._$addEvent(_d,'mouseup',_onMouseUp);
                        _v._$addEvent(_d.defaultView,'focus',_onFocus);
                    }
                }
            }
        })();
	});

	// ie6-9 editor patch
	NEJ.patch('PV',function(){
	    var __reg_nwrd = /<\/?[\w]+:[\w]+.*?>/gi,
	        __opspc    = '';
	    /**
	     * 执行编辑命令
	     * @param  {Node}   _document 文档对象
	     * @param  {String} _command  命令名称
	     * @param  {String} _value    命令值
	     * @return {Void}
	     */
	    _h.__execCommand =
	    _h.__execCommand._$aop(function(_event){
	        var _args = _event.args;
	        if (_args[1]=='hiliteColor')
	            _args[1] = 'backColor';
	    });

	    /**
	     * 验证presto下内容是否来自Word
	     * @param  {String} _html 内容
	     * @return {Boolean}      presto下内容是否来自Word
	     */
	    var __isFromWord = function(_html){
	        return (_html||'').search('</?[\\w]+:[\\w]+.*?>')>=0;
	    };

	    /**
	     * presto清除word过来的冗余内容
	     * @param  {String} _html 内容
	     * @return {String} 过滤后的内容
	     */
	    _h.__filterWordContent = function(_html){
	        if(!__isFromWord(_html))
	            return _html;
	        return _html.replace(__reg_nwrd,'');
	    };

	    /**
	     * presto特殊过滤
	     * @param {Object} _html
	     */
	    _h.__filterContentPath = function(_html){
	        return _html.replace(__opspc,'&nbsp;');
	    };
	});

	// ie editor patch
	NEJ.patch('TR',function(){
	     var __reg_nwrd = /<\/?[\w]+:[\w]+.*?>/gi,
	         __reg_cxml = /<\?xml[^>]*>/gi;
	    /**
	     * 验证trident下内容是否来自Word
	     * @param  {String} _html 内容
	     * @return {Boolean}      trident下内容是否来自Word
	     */
	    var __isFromWord = function(_html){
	        return (_html||'').search('</?[\\w]+:[\\w]+.*?>')>=0;
	    };

	    /**
	     * trident清除word过来的冗余内容
	     * @param  {String} _html 内容
	     * @return {String} 过滤后的内容
	     */
	    _h.__filterWordContent = function(_html){
	        if(!__isFromWord(_html))
	            return _html;
	        return _html.replace(__reg_nwrd,'').replace(__reg_cxml,'');
	    };
	});

	// ie6-8
	NEJ.patch('TR<=4.0',function(){
        _h.__getSelectText = function(_document){
            var _range = _h.__getRange(_document);
            if (!_range) return '';
            return _range.text;
        };
        _h.__getSelectHtml = function(_document){
            var _range = _h.__getRange(_document);
	        if (!_range) return '';
	        var _html = _range.htmlText;
            return _html||'';
        };
    });

	// ie6-8 editor patch
	NEJ.patch('TR<=4.0',function(){
	    /**
	     * 移动光标至节点的指定位置
	     * @param  {Node}   _node     节点
	     * @param  {Number} _position 位置，0-末尾、1-起始
	     * @return {Void}
	     */
	    _h.__moveCursorPosition = (function(){
	        var _fmap = [function(_node){return _node.innerText.length;}
	                    ,function(){return 0;}];
	        return _h.__moveCursorPosition._$aop(
	               function(_event){
	                    var _args = _event.args,
	                       _range = _h.__getRange(
	                                _h.__getWindow(_args[0]));
	                    if (!!_range && !!_range.move){
	                       _event.stopped = !0;
	                       var _func = _fmap[_args[1]];
	                       if (!_func) return;
	                       _range.move('character',_func(_args[0]));
	                       _range.select();
	                   }
	               });
	    })();
	});

	// ie10+ editor patch
	NEJ.patch('TR>=6.0',['./editor.td.js'],function(){
	    var _  = NEJ.P,
	        _u = _('nej.u'),
	        _p = _('nej.p'),
	        _h = _('nej.h');
	    var __reg_nwrd = /<\/?[\w]+:[\w]+.*?>/gi;
	    /**
	     * 验证trident1下内容是否来自Word
	     * @param  {String} _html 内容
	     * @return {Boolean}      FF下内容是否来自Word
	     */
	    var __isFromWord = function(_html){
	        return (_html||'').search('</?[\\w]+:[\\w]+.*?>')>=0;
	    };

	    /**
	     * trident1清除word过来的冗余内容
	     * @param  {String} _html 内容
	     * @return {String} 过滤后的内容
	     */
	    _h.__filterWordContent = function(_html){
	        if(!__isFromWord(_html))
	            return _html;
	        return _html.replace(__reg_nwrd,'');
	    };
	});
	 // ie7-10
	NEJ.patch('TR>=3.0',function(){

        var  _rcache = {};
        /**
         * 执行编辑命令
         * @param  {Node}   _document 文档对象
         * @param  {String} _command  命令名称
         * @param  {String} _value    命令值
         * @return {Void}
         */
        _h.__execCommand =
        _h.__execCommand._$aop(function(_event){
            var _args = _event.args;
            if (_args[1]=='styleWithCSS'){
                _event.stopped = !0;
                return;
            }
            _h.__focusRange(_args[0].body);
            if (_args[1]=='hiliteColor')
                _args[1] = 'backColor';
        });
        /**
         * 保存当前选择状态
         * @param  {Node} _node 节点
         * @return {Void}
         */
        _h.__saveRange =
        _h.__saveRange._$aop(function(_event){
            if (!!document.selection){
                _event.stopped = !0;
                var _node = _event.args[0],
                    _doc = _h.__getDocument(_node),
                    _id = _e._$id(_doc);
                _rcache[_id] = _h.__getRange(
                    _h.__getWindow(_doc)
                );
            }
        });
        /**
         * 聚焦至选中区域
         * @param  {Node} _node 节点
         * @return {Void}
         */
        _h.__focusRange =
        _h.__focusRange._$aop(null,function(_event){
            var _doc = _h.__getDocument(_event.args[0]),
                _id = _e._$id(_doc),
                _range = _rcache[_id];
            if (!!_range){
                if (!!_range.select){
                    _range.select();
                }else{
                    // for ie11
                    var _selection = _h.__getSelection(
                        _h.__getWindow(_doc)
                    );
                    _selection.addRange(_range);
                }
                delete _rcache[_id];
            }
        });
        /**
         * 清除选择状态
         * @param  {Node} _node 节点
         * @return {Void}
         */
        _h.__clearRange =
        _h.__clearRange._$aop(null,function(_event){
            var _id = _e._$id(
                _h.__getDocument(_event.args[0])
            );
            delete _rcache[_id];
        });

        /**
         * 获取range cache
         * @return {Object} range cache对象
         */
        _h.__getRcache = function(){
            return _rcache;
        };

	});

	// ie9+
	NEJ.patch('TR>=5.0',function(){
	    /**
	     * 保存当前选择状态
	     * @param  {Node} _node 节点
	     * @return {Void}
	     */
	    _h.__saveRange =
	    _h.__saveRange._$aop(function(_event){
	    	// if have selection patched is on editor.td.js
	        if (!document.selection){
	            _event.stopped = !0;
	            var _node = _event.args[0],
	                _doc = _h.__getDocument(_node),
	                _id = _e._$id(_doc),
	                _rcache = _h.__getRcache();
	            _rcache[_id] = _h.__getRange(
	                _h.__getWindow(_doc)
	            );
	        }
	    });
		/**
	     * 插入html命令处理
	     * @param {Object} _document 文档对象
	     * @param {Object} _html
	     */
	    _h.__insertHtml = function(_doc,_html){
	        // inserthtml for ie11
            var _win = _h.__getWindow(_doc),
                _range = _h.__getRange(_win);
            var _node = _doc.createElement('div');
            _node.innerHTML = _html;
            // insert content
            _range.deleteContents();
            _u._$reverseEach(
                _node.childNodes,
                function(_elm){
                    _range.insertNode(_elm);
                }
            );
            // set focus
            var _selection = _h.__getSelection(_win);
            _selection.collapseToEnd();
            _win.focus();
	    };

        /**
         * 移动光标至节点的指定位置
         * @param  {Node}   _node     节点
         * @param  {Number} _position 位置，0-末尾、1-起始、3-当前位置
         * @return {Void}
         */
        _h.__moveCursorPosition = (function(){
            var _fmap = [function(_node){return _node.innerText.length;}
                        ,function(){return 0;}];
            return _h.__moveCursorPosition._$aop(
                function(_event){
                    var _args = _event.args,
                        _node = _args[0],
                        _position = _args[1],
                        _func = _fmap[_position],
                        _selection = _h.__getSelection(_h.__getWindow(_node));
                    if (_position == 2){
                        return;
                    }
                    if (_position == 3){
                        var _focusOffset = _selection.focusOffset;
                        _node = _selection.focusNode||_node;
                        _selection.collapse(_node,_focusOffset);
                    }else{
                        _selection.collapse(_node,_func(_node));
                    }
                    _event.stopped = !0;
                });
        })();
	});

    return _h;
});
