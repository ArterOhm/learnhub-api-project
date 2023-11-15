import {RedisClientType} from "redis"
import {IBlackListRepository} from "."
import {BLACKLIST_REDIS_KEY_PREFIX, BLACKLIST_REDIS_VALUE} from "../const"

export default class BlacklistRepository implements IBlackListRepository {
  private clnt: RedisClientType

  constructor(clnt: RedisClientType) {
    this.clnt = clnt
  }

  async addToBlacklist(token: string, exp: Date): Promise<void> {
    await this.clnt.SET(
      `${BLACKLIST_REDIS_KEY_PREFIX}${token}`,
      BLACKLIST_REDIS_VALUE
    )
    await this.clnt.EXPIREAT(`${BLACKLIST_REDIS_KEY_PREFIX}${token}`, exp)
    return
  }

  async isAlreadyBlacklisted(token: string): Promise<boolean> {
    const val = await this.clnt.GET(`${BLACKLIST_REDIS_KEY_PREFIX}${token}`)
    return val === BLACKLIST_REDIS_VALUE
  }
}
