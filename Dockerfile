FROM minimum2scp/baseimage
RUN /etc/profile.d/nvm.sh
RUN bash -lc "nvm install stable"
VOLUME .:/app
ENTRYPOINT node /app/app.js
