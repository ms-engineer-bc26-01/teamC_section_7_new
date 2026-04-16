import logging
import os

# ログを保存するディレクトリを作成
LOG_DIR = "logs"
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

# ロガーの設定
logging.basicConfig(
    level=logging.ERROR,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        # ターミナルに出力
        logging.StreamHandler(),
        # logs/error.log に書き出し
        logging.FileHandler(os.path.join(LOG_DIR, "error.log"), encoding="utf-8")
    ]
)

logger = logging.getLogger("backend_logger")