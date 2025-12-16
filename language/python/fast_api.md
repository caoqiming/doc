# fast api

[文档](https://fastapi.tiangolo.com/tutorial/body/)

install

```bash
pip install "fastapi[standard]"
```

run

```bash
fastapi dev main.py
```

## async & await

## 用 openapiv3 定义文件生成代码

```bash
docker run --rm \
    -v "${PWD}:/local" \
    openapitools/openapi-generator-cli generate \
    -i /local/idl/openapiv3.yaml \
    -g python-fastapi \
    -o /local/gen
```

在 `gen/src/openapi_server/apis/default_api.py` 里的就是每一个 api
会自动调用`BaseDefaultApi`的第一个子类的实现

```python
@router.post(
    "/api/getAttitude",
    responses={
        200: {"model": Attitude, "description": "OK"},
    },
    tags=["default"],
    summary="Get attitude of the mobile device",
    response_model_by_alias=True,
)
async def api_get_attitude_post(
) -> Attitude:
    if not BaseDefaultApi.subclasses:
        raise HTTPException(status_code=500, detail="Not implemented")
    return await BaseDefaultApi.subclasses[0]().api_get_attitude_post()
```

一般应该在 `gen/src/openapi_server/impl` 里实现 `BaseDefaultApi` 的子类，像这样

```python
from openapi_server.apis.default_api_base import BaseDefaultApi
from openapi_server.models.api_get_star_catalog_post200_response import ApiGetStarCatalogPost200Response
from handler.api_get_star_catalog_post import api_get_star_catalog_post


class DefaultApiImpl(BaseDefaultApi):

    async def api_get_star_catalog_post(self) -> ApiGetStarCatalogPost200Response:
        # 将业务逻辑委托给服务层
        return await api_get_star_catalog_post()
```
