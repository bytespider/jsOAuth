SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist
BUILD_DIR = ${PREFIX}/build
TESTS_DIR = ${PREFIX}/tests

DEST_DIR = ${DIST_DIR}

SRC_FILES = ${SRC_DIR}/start.js \
	${SRC_DIR}/interface.js \
	${SRC_DIR}/collection.js \
	${SRC_DIR}/uri.js \
	${SRC_DIR}/http.js \
	${SRC_DIR}/end.js
	
VERSION = ${shell cat Version}
TIMESTAMP = ${shell git log -1 . | grep Date: | sed 's/.*: //g'}
REVISION = ${shell git rev-list --max-count=1 --all}

VER = sed 's/@VERSION/${VERSION}/'
DATE = sed 's/@DATE/${TIMESTAMP}/'
REV = sed 's/@REV/${REVISION}/'

JOA_DEBUG = ${DIST_DIR}/jsOAuth.js
JOA_PRODUCTION = ${DIST_DIR}/jsOAuth-${VERSION}.js
JOA_PRODUCTION_MIN = ${DIST_DIR}/jsOAuth-${VERSION}.min.js
JOA_PRODUCTION_COMPILED = ${DIST_DIR}/jsOAuth-${VERSION}.compiled.js

TEST_SRV = /c/wamp/www/jsoauth

all: joauth
	

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

joauth: ${DIST_DIR} ${JOA_PRODUCTION} ${JOA_COMPILED} ${JOA_MIN}

${JOA_DEBUG}: ${SRC_FILES}
	@@echo "Building" ${JOA_DEBUG}
	
	@@cat ${SRC_FILES} | \
		${REV} | \
		${DATE} | \
		${VER} > ${JOA_DEBUG}
	
	@@echo "Build complete."
	@@echo ""
	
${JOA_PRODUCTION}: ${JOA_DEBUG}
	@@echo "Versioning" ${JOA_PRODUCTION}
	@@echo "    Date:" ${TIMESTAMP}
	@@echo "    Revision:" ${REVISION}
	
	@@cat ${JOA_DEBUG} > ${JOA_PRODUCTION}
	
	@@echo "Vesioning complete."
	@@echo ""

${JOA_COMPILED}: ${JOA_PRODUCTION}
	@@echo "Compiling ${JOA_PRODUCTION} > ${JOA_COMPILED}"
	@java -jar ${BUILD_DIR}/closure-compiler/compiler.jar \
	   --js ${JOA_PRODUCTION} \
	   --js_output_file ${JOA_COMPILED} \
	   --compilation_level ADVANCED_OPTIMIZATIONS \
	   --output_js_string_usage
	@@echo "Compile complete."
	@@echo ""

${JOA_MIN}: ${JOA_PRODUCTION}
	@@echo "Shrinking ${JOA_PRODUCTION} > ${JOA_MIN}"
	@java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar \
	   --charset UTF-8 \
	   -o ${JOA_MIN} \
	   -v \
	   ${JOA}
	@@echo "Shrink complete."
	@@echo ""
	
test: ${DIST_DIR} ${JOA_DEBUG}
	@@echo "Copying files to ${TEST_SRV}"
	@@mkdir -p ${TEST_SRV}
	@@cp -R ${JOA_DEBUG} ${TEST_SRV}/.
	@@cp -R ${TESTS_DIR}/index.html ${TEST_SRV}/.
	@@cp -R ${TESTS_DIR}/tests.js ${TEST_SRV}/.
	@@mkdir -p ${TEST_SRV}/src
	@@cp -R ${SRC_DIR}/Service ${TEST_SRV}/src/.
	@@echo "Tests copied."
	@@echo ""

clean:
	@@echo "Removing Distribution directory: ${DIST_DIR}"
	@@rm -rf ${DIST_DIR}
	@@echo "Removing Distribution directory: ${TEST_SRV}"
	@@rm -rf ${TEST_SRV}