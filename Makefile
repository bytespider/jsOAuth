SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist
BUILD_DIR = ${PREFIX}/build

DEST_DIR = ${DIST_DIR}

SRC_FILES = ${SRC_DIR}/jsOAuth.js \
	${SRC_DIR}/helpers/Url.js

VERSION = ${shell cat Version}
TIMESTAMP = ${shell git log -1 . | grep Date: | sed 's/.*: //g'}
REVISION = ${shell git rev-list --max-count=1 --all}

VER = sed 's/@VERSION/${VERSION}/'
DATE = sed 's/@DATE/${TIMESTAMP}/'
REV = sed 's/@REV/${REVISION}/'

JOA = ${DIST_DIR}/jsOAuth-${VERSION}.js
JOA_COMPILED = ${DIST_DIR}/jsOAuth-${VERSION}.compiled.js

all: joauth
	

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

joauth: ${DIST_DIR} ${JOA} ${JOA_COMPILED}
	
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
	@@java -jar ${BUILD_DIR}/closure-compiler/compiler.jar --js ${JOA} --js_output_file ${JOA_COMPILED}
	@@echo "Compile complete."
	@@echo ""

clean:
	@@echo "Removing Distribution directory: ${DIST_DIR}"
	@@rm -rf ${DIST_DIR}
