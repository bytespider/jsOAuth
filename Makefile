SRC_DIR = src

PREFIX = .
DIST_DIR = ${PREFIX}/dist

FILES = ${SRC_DIR}/jsOAuth.js

JOA = ${DIST_DIR}/jsOAuth.js
VERSION = `cat Version`

VER = sed s/@VERSION/${VERSION}/

DATE = `git log -1 . | grep Date: | sed 's/.*: //g'`
REV = `git rev-list --max-count=1 --all`

all: joauth

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

joauth: ${DIST_DIR} ${JOA}

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

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
