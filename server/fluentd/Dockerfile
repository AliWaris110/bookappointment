FROM fluent/fluentd:latest
LABEL DECODER <fidahussain.shahani@gmail.com>

USER root

RUN apk add --no-cache --update --virtual .build-deps \
  sudo build-base ruby-dev \
  && sudo gem install fluent-plugin-elasticsearch \
  && sudo gem install fluent-plugin-record-modifier \
  && sudo gem install fluent-plugin-concat \
  && sudo gem install fluent-plugin-multi-format-parser \
  && sudo gem sources --clear-all \
  && apk del .build-deps \
  && rm -rf /home/fluent/.gem/ruby/2.5.0/cache/*.gem

COPY fluent.conf /fluentd/etc/