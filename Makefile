SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist
BUILD_DIR = ${PREFIX}/build

DEST_DIR = ${DIST_DIR}

SRC_FILES = ${SRC_DIR}/start.js \
	${SRC_DIR}/interface.js \
	${SRC_DIR}/uri.js \
	${SRC_DIR}/http.js \
	${SRC_DIR}/collection.js \
	${SRC_DIR}/end.js

VERSION = ${shell cat Version}
TIMESTAMP = ${shell git log -1 . | grep Date: | sed 's/.*: //g'}
REVISION = ${shell git rev-list --max-count=1 --all}

VER = sed 's/@VERSION/${VERSION}/'
DATE = sed 's/@DATE/${TIMESTAMP}/'
REV = sed 's/@REV/${REVISION}/'

JOA = ${DIST_DIR}/jsOAuth-${VERSION}.js
JOA_MIN = ${DIST_DIR}/jsOAuth-${VERSION}.min.js
JOA_COMPILED = ${DIST_DIR}/jsOAuth-${VERSION}.compiled.js

all: joauth
	

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

joauth: ${DIST_DIR} ${JOA} ${JOA_COMPILED} ${JOA_MIN}
	
${JOA}: ${SRC_FILES}
	@@echo "Building" ${JOA}
	@@echo "    Date:" ${TIMESTAMP}
	@@echo "    Revision:" ${REVISION}
	
	@@cat ${SRC_FILES} | \
		${REV} | \
		${DATE} | \
		${VER} > ${JOA}
	
	@@echo "Build complete."
	@@echo ""

${JOA_COMPILED}: ${JOA}
	@@echo "Compiling ${JOA} > ${JOA_COMPILED}"
	@java -jar ${BUILD_DIR}/closure-compiler/compiler.jar \
	   --js ${JOA} \
	   --js_output_file ${JOA_COMPILED} \
	   --compilation_level ADVANCED_OPTIMIZATIONS \
	   --output_js_string_usage
	@@echo "Compile complete."
	@@echo ""

${JOA_MIN}: ${JOA}
	@@echo "Shrinking ${JOA} > ${JOA_MIN}"
	@java -jar ${BUILD_DIR}/yuicompressor-2.4.2.jar \
	   --charset UTF-8 \
	   -o ${JOA_MIN} \
	   -v \
	   ${JOA}
	@@echo "Shrink complete."
	@@echo ""

clean:
	@@echo "Removing Distribution directory: ${DIST_DIR}"
	@@rm -rf ${DIST_DIR}
