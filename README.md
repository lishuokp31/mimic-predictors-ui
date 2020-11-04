# MIMIC predictors UI

This repository contains the codebase of the single-page web application that is used to demonstrate the predictors on sepsis, MI, vancomycin, and AKI.

## Prerequisites

NPM packages are needed to be installed locally if you wish to run/build the app.

```bash
npm install
```

## How to run locally

```bash
ng serve
```

## How to build production bundle

```bash
ng build --prod --baseHref=/app/
```

## How to build staging bundle

```bash
ng build --configuration staging --baseHref=/app/
```

## How to build Docker image

```bash
npm run build-image
docker tag hitmimicpredictors/frontend:latest hitmimicpredictors/frontend:<version>
```
