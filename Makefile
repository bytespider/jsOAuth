SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist
BUILD_DIR = ${PREFIX}/build
SPEC_DIR = ${PREFIX}/spec

COMMONJS_DIR = ${DIST_DIR}/CommonJS
COMMONJS_LIB_DIR = ${COMMONJS_DIR}/lib
COMMONJS_TEST_DIR = ${COMMONJS_DIR}/tests

DEST_DIR = ${DIST_DIR}

SRC_FILES = ${SRC_DIR}/start.js \
	${SRC_DIR}/OAuth/List.js \
	${SRC_DIR}/OAuth/Param.js \
	${SRC_DIR}/OAuth/ParamList.js \
	${SRC_DIR}/OAuth/URI.js \
	${SRC_DIR}/OAuth/Consumer.js \
	${SRC_DIR}/OAuth/Request.js \
	${SRC_DIR}/OAuth/Crypto.js \
	${SRC_DIR}/end.js \
	${SRC_DIR}/OAuth/Base64.js


VERSION = ${shell cat Version}
TIMESTAMP = ${shell git log -1 . | grep Date: | sed 's/.*: //g'}
REVISION = ${shell git rev-list --max-count=1 --all}

VER = sed 's/@VERSION/${VERSION}/'
DATE = sed 's/@DATE/${TIMESTAMP}/'
REV = sed 's/@REV/${REVISION}/'

JSOA_DEBUG = ${DIST_DIR}/jsOAuth.js
JSOA_PRODUCTION = ${DIST_DIR}/jsOAuth-${VERSION}.js
JSOA_PRODUCTION_MIN = ${DIST_DIR}/jsOAuth-${VERSION}.min.js
JSOA_PRODUCTION_UGLY = ${DIST_DIR}/jsOAuth-${VERSION}.min.js
JSOA_PRODUCTION_COMPILED = ${DIST_DIR}/jsOAuth-${VERSION}.compiled.js
JSOA_COMMONJS = ${COMMONJS_LIB_DIR}/jsOAuth.js
JSOA_COMMONJS_ZIP = ${DIST_DIR}/jsOAuth-${VERSION}.CommonJS.zip

all: jsoauth commonjs

jsoauth: ${DIST_DIR} ${JSOA_PRODUCTION} ${JSOA_PRODUCTION_UGLY} ${JSOA_PRODUCTION_COMPILED}

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

${JSOA_DEBUG}: ${SRC_FILES} ${DIST_DIR}
	@@echo "Building" ${JSOA_DEBUG}

	@@cat ${SRC_FILES} | \
		${REV} | \
		${DATE} | \
		${VER} > ${JSOA_DEBUG}

	@@cat Readme.build | ${VER} > README.md

	@@echo "Build complete."
	@@echo ""

${JSOA_PRODUCTION}: ${JSOA_DEBUG}
	@@echo "Versioning" ${JSOA_PRODUCTION}
	@@echo "	Date:" ${TIMESTAMP}
	@@echo "	Revision:" ${REVISION}

	@@cat ${JSOA_DEBUG} > ${JSOA_PRODUCTION}

	@@echo "Vesioning complete."
	@@echo ""

${JSOA_PRODUCTION_COMPILED}: ${JSOA_PRODUCTION}
	@@echo "Compiling ${JSOA_PRODUCTION} > ${JSOA_PRODUCTION_COMPILED}"
	@java -jar ${BUILD_DIR}/closure-compiler/compiler.jar \
	   --js ${JSOA_PRODUCTION} \
	   --js_output_file ${JSOA_PRODUCTION_COMPILED} \
	   --charset UTF-8 \
	   --compilation_level ADVANCED_OPTIMIZATIONS
	@@echo "Compile complete."
	@@echo ""

${JSOA_PRODUCTION_MIN}: ${JSOA_PRODUCTION}
	@@echo "Shrinking ${JSOA_PRODUCTION} > ${JSOA_PRODUCTION_MIN}"
	@java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar \
	   --charset UTF-8 \
	   -o ${JSOA_PRODUCTION_MIN} \
	   -v \
	   ${JSOA_PRODUCTION}
	@@echo "Shrink complete."
	@@echo ""

${JSOA_PRODUCTION_UGLY}: ${JSOA_PRODUCTION}
	@@echo "Uglifying ${JSOA_PRODUCTION} > ${JSOA_PRODUCTION_UGLY}"
	@@curl --data-urlencode js_code@${JSOA_PRODUCTION} \
    	-o ${JSOA_PRODUCTION_UGLY} \
    	http://marijnhaverbeke.nl/uglifyjs

	@@echo "Uglify complete."
	@@echo ""

${JSOA_COMMONJS}: ${JSOA_PRODUCTION_MIN}
	@@echo "Building CommonJS / Node.JS module"
	@@mkdir -p ${COMMONJS_LIB_DIR}
	@@mkdir -p ${COMMONJS_TEST_DIR}
	@@cat ${JSOA_PRODUCTION_MIN} > ${JSOA_COMMONJS}
	@@cp ${SPEC_DIR}/test-* ${COMMONJS_TEST_DIR}/.
	@@cp ${SRC_DIR}/package.json ${COMMONJS_DIR}/.
	@@echo "Build complete."

commonjs-compress: ${JSOA_COMMONJS}
	@@echo "Compressing..."
	@@ditto -ck --sequesterRsrc --keepParent ${COMMONJS_LIB_DIR} ${JSOA_COMMONJS_ZIP}
	@@echo "Compression complete"

commonjs: ${JSOA_COMMONJS}

clean:
	@@echo "Removing Distribution directory: ${DIST_DIR}"
	@@rm -rf ${DIST_DIR}
	@@echo ""
