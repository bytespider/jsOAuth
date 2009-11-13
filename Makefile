SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist
BUILD_DIR = ${PREFIX}/build

FILES = ${SRC_DIR}/jsOAuth.js

JOA = ${DIST_DIR}/jsOAuth.js
JOA_COMPILED = ${DIST_DIR}/jsOAuth-compiled.js
VERSION = `cat Version`

VER = sed s/@VERSION/${VERSION}/

DATE = `git log -1 . | grep Date: | sed 's/.*: //g'`
REV = `git rev-list --max-count=1 --all`

all: joauth

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

joauth: ${DIST_DIR} ${JOA} compile

${JOA}: ${FILES}
	@@echo "Building" ${JOA}
	@@echo "Date:" ${DATE}
	@@echo "Revision:" ${REV}
	
	@@mkdir -p ${DIST_DIR}
	@@cat ${FILES} | \
		sed 's/Date:./&'"${DATE}"'/' | \
		sed 's/Revision:./&'${REV}'/' | \
		${VER} > ${JOA};
	
	@@echo ${JOA} "Build complete"
	@@echo

compile:
	@@echo "Compiling to " ${JOA_COMPILED}
	@@java -jar ${BUILD_DIR}/closure-compiler/compiler.jar --js ${JOA} --js_output_file ${JOA_COMPILED}
	@@echo ${JOA_COMPILED} ": Compiled!"


clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
