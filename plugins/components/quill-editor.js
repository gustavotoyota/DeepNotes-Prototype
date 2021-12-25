import Quill from "quill";  
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from "quill-image-resize-module"

Quill.register('modules/imageDrop', ImageDrop)
Quill.register("modules/imageResize", ImageResize)




var Align = Quill.import('attributors/style/align');
var Icons = Quill.import('ui/icons');
Icons.align['left'] = Icons.align['']; // set icon for 'left' option, otherwise it's replaced with 'undefined' text
Align.whitelist = ['left', 'center', 'right', 'justify']; // add explicit 'left' option
Quill.register(Align, true);




var Size = Quill.import('attributors/style/size');
Size.whitelist = ['8px','9px','10px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px'];
Quill.register(Size, true);




let AlignStyle = Quill.import('attributors/style/align')
let BackgroundStyle = Quill.import('attributors/style/background')
let ColorStyle = Quill.import('attributors/style/color')
let DirectionStyle = Quill.import('attributors/style/direction')
let FontStyle = Quill.import('attributors/style/font')
let SizeStyle = Quill.import('attributors/style/size')    

Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(ColorStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);
Quill.register(SizeStyle, true);




import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor, /* { default global options } */)