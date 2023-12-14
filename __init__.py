# coding=utf-8
import os
import json
import platform
import sys
import numpy as np
import builtins
import torch
import shutil
import hashlib
import atexit
import server
import gc
import execution
import folder_paths
from functools import lru_cache
from aiohttp import web
from pathlib import Path
from PIL import Image
from PIL.PngImagePlugin import PngInfo

VERSION = "0.0.1"
ADDON_NAME = "COMFYUI-DOWNLOAD-ANY"  # 存放在web/extensions下的前端html和js的文件夹名
COMFY_PATH = Path(folder_paths.__file__).parent
CUR_PATH = Path(__file__).parent






@server.PromptServer.instance.routes.post("/yxcda/helloworld")
async def get_hellowworld(request):
    """
    @des: 自定义http接口
    """
    # post = await request.post()
    # locale = post.get("locale", "en_US")
    json_data = "{}"
    try:
        json_data = json.dumps({'hello':'world'}, ensure_ascii=False)
    except Exception as e:
        sys.stderr.write(f"[yxcda/helloworld error]: {e}\n")
        sys.stderr.flush()
    return web.Response(status=200, body=json_data)


def rmtree(path: Path):
    # unlink symbolic link
    if Path(path.resolve()).as_posix() != path.as_posix():
        path.unlink()
        return
    if not path.exists():
        return
    if path.is_file():
        path.unlink()
    elif path.is_dir():
        # 移除 .git
        if path.name == ".git":
            if platform.system() == "darwin":
                from subprocess import call
                call(['rm', '-rf', path.as_posix()])
            elif platform.system() == "Windows":
                os.system(f'rd/s/q "{path.as_posix()}"')
            return
        for child in path.iterdir():
            rmtree(child)
        try:
            path.rmdir()  # nas 的共享盘可能会有残留
        except BaseException:
            ...


def register():
    """
    @des: 将整个项目包含js都注册到comfyui的web中
    """
    cda_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    rmtree(cda_ext_path)
    try:
        if os.name == "nt":
            import _winapi
            _winapi.CreateJunction(CUR_PATH.as_posix(), cda_ext_path.as_posix())
        else:
            # 复制时过滤 .git
            shutil.copytree(CUR_PATH.as_posix(), cda_ext_path.as_posix(), ignore=shutil.ignore_patterns(".git"))
    except Exception as e:
        sys.stderr.write(f"[yxcda/register error]: {e}\n")
        sys.stderr.flush()
    return
    


def unregister():
    """
    @des: 移除整个项目包含js都注册到comfyui的web中
    """
    # 移除缓存json
    # for data in CUR_PATH.glob("*.json"):
    #     if not data.name.startswith("translations_"):
    #         continue
    #     data.unlink()

    cda_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    try:
        rmtree(cda_ext_path)
    except BaseException:
        ...


register()
atexit.register(unregister)
NODE_CLASS_MAPPINGS = {}