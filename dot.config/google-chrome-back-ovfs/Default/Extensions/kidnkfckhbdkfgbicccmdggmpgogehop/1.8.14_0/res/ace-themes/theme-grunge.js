/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define('ace/theme/grunge', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-grunge";
exports.cssText = "/* THIS THEME WAS AUTOGENERATED BY Theme.tmpl.css (UUID: 42dd5b57-5163-e4a0-3fb1-6c58f7c7ce50) */\
.ace-grunge .ace_gutter {\
background: #e8e8e8;\
color: #333;\
}\
.ace-grunge .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-grunge {\
background-color: #31332C;\
color: #F8F8F2;\
}\
.ace-grunge .ace_cursor {\
color: #f8f8f0;\
}\
.ace-grunge .ace_marker-layer .ace_selection {\
background: #F56991;\
}\
.ace-grunge.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #31332C;\
border-radius: 2px;\
}\
.ace-grunge .ace_marker-layer .ace_step {\
background: rgb(198, 219, 174);\
}\
.ace-grunge .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #3b3a32;\
}\
.ace-grunge .ace_marker-layer .ace_active-line {\
background: #41453A;\
}\
.ace-grunge .ace_gutter-active-line {\
background-color: #41453A;\
}\
.ace-grunge .ace_marker-layer .ace_selected-word {\
border: 1px solid #F56991;\
}\
.ace-grunge .ace_fold {\
background-color: #FFC48C;\
border-color: #F8F8F2;\
}\
.ace-grunge .ace_keyword{color:#91A374;}.ace-grunge .ace_keyword.ace_other.ace_unit{color:#D1F2A5;}.ace-grunge .ace_constant.ace_language{color:#F56991;}.ace-grunge .ace_constant.ace_numeric{color:#F56991;}.ace-grunge .ace_constant.ace_character{color:#F56991;}.ace-grunge .ace_constant.ace_other{color:#F56991;}.ace-grunge .ace_support.ace_function{color:#FFC48C;}.ace-grunge .ace_support.ace_constant{color:#F56991;}.ace-grunge .ace_support.ace_constant.ace_property-value{color:#D1F2A5;}.ace-grunge .ace_support.ace_class{font-style:italic;\
color:#F56991;}.ace-grunge .ace_support.ace_type{font-style:italic;\
color:#F56991;}.ace-grunge .ace_storage{color:#F56991;}.ace-grunge .ace_storage.ace_type{color:#D1F2A5;}.ace-grunge .ace_invalid{color:#f8f8f0;\
background-color:#00a8c6;}.ace-grunge .ace_invalid.ace_deprecated{color:#f8f8f0;\
background-color:#00a8c6;}.ace-grunge .ace_string{color:#D1F2A5;}.ace-grunge .ace_comment{color:#5C634F;}.ace-grunge .ace_variable{color:#FFC48C;}.ace-grunge .ace_variable.ace_parameter{font-style:italic;}.ace-grunge .ace_entity.ace_other.ace_attribute-name{color:#F56991;}.ace-grunge .ace_entity.ace_name.ace_function{color:#FFC48C;}.ace-grunge .ace_entity.ace_name.ace_tag{color:#D1F2A5;}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
