````bash
helm template aoecze-hello-js congstar-platform/jack-of-all-trades --version 0.7.1 -n apps --values values.yaml
helm upgrade --install aoecze-hello-js congstar-platform/jack-of-all-trades --version 0.7.1 -n apps --values values.yaml

helm uninstall aoecze-hello-js -n apps
````