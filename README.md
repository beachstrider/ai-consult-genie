# AI-Consultants powered by OpenAI

This is the repository that holds the source code of the backend of ADAMO AI.

## Deploy FastAPI on Render

Use this guide as a template to deploy a Python [FastAPI](https://fastapi.tiangolo.com) service on Render.

See https://render.com/docs/deploy-fastapi or follow the steps below:

### Manual Steps

1. You may use this repository directly or [create your own repository from this template](https://github.com/render-examples/fastapi/generate) if you'd like to customize the code.
2. Create a new Web Service on Render.
3. Specify the URL to your new repository or this repository.
4. Render will automatically detect that you are deploying a Python service and use `pip` to download the dependencies. (via [render.yaml](render.yaml) and [requirements.txt](requirements.txt) files)
5. Specify the following as the Start Command. (in the [requirements.txt](requirements.txt) file)

   ```shell
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

6. Click Create Web Service.

Or simply click:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/render-examples/fastapi)

## Setup Frontend Locally

```
npm install

npm run dev
```
# ai-consult-genie
