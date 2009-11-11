SRC_DIR = src
BUILD_DIR = build

PREFIX = .
DIST_DIR = ${PREFIX}/dist

BASE_FILES = ${SRC_DIR}/jsOAuth.js

JOA = ${DIST_DIR}/jsOAuth.js
VERSION = `cat Version`

VER = sed s/@VERSION/${VERSION}/

DATE = ${`git log . | grep Date: | sed 's/.*: //g'`}
REV = ${`git rev-list --max-count=1 --all`}

all: joauth

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

joauth: ${DIST_DIR} ${JOA}

${JOA}: ${BASE_FILES}
	@@echo "Building" ${JOA}
	
	@@mkdir -p ${DIST_DIR}
	@@cat ${BASE_FILES} | \
		sed 's/Date:./&'${DATE}'/' | \
		sed 's/Revision:./&'${REV}'/' | \
		${VER} > ${JOA};
	
	@@echo ${JOA} "Built"
	@@echo

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
