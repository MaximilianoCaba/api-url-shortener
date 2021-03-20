import * as base62 from 'base62';
import { getRepository } from 'typeorm';
import UrlEntity from '../entity/urlEntity';
import cacheManager from 'cache-manager';
import { urlCheck } from '../util/urlUtils';

const memoryCache = cacheManager.caching({ store: 'memory', ttl: 604800 });

const getByDecodeId = async (decodeId) => {
  console.log(`[urlService.getByDecodeId] find url by decodeId: ${decodeId}`);
  const id = base62.decode(decodeId);
  const urlEntity = await getRepository(UrlEntity).findOne(id);
  if (!urlEntity) {
    console.error(`[urlService.getByDecodeId] decodeId: ${decodeId} is invalid`);
    throw new Error('Url Is invalid');
  }
  console.log(`[urlService.getByDecodeId] found urlEntity id: ${urlEntity.id}`);
  return urlEntity;
};

const get = async (decodeId) => {
  console.log(`[urlService.get] find url by decodeId: ${decodeId}`);
  let urlEntity = await memoryCache.get(decodeId);
  if (!urlEntity) {
    console.log(`[urlService.get] find url in db by decode id: ${decodeId}`);
    urlEntity = await getByDecodeId(decodeId);
    console.log(`[urlService.get] save cache by decodeId: ${decodeId}`);
    await memoryCache.set(decodeId, urlEntity);
  }
  if (!urlEntity.enabled) {
    console.error(`[urlService.get] url is disabled by: ${decodeId}`);
    throw new Error('URL redirect is disabled');
  }
  console.log(`[urlService.get] return url: ${urlEntity.url} by decodeId: ${decodeId}`);
  return urlEntity.url;
};

const save = async (urlDto) => {
  console.log(`[urlService.save] save by dto: ${JSON.stringify(urlDto)}`);
  const URL_BASE = process.env.URL_BASE;
  urlCheck(urlDto);
  const urlEntity = await getRepository(UrlEntity).save({
    url: urlDto.url,
    enabled: true,
  });
  console.log(`[urlService.save] urlEntity salved by id : ${urlEntity.id}`);
  const encoreId = base62.encode(urlEntity.id);
  console.log(`[urlService.save] return url : ${URL_BASE + encoreId}`);
  return URL_BASE + encoreId;
};

const update = async (decodeId, urlDto) => {
  console.log(`[urlService.update] by id : ${decodeId} and dto: ${JSON.stringify(urlDto)}`);
  console.log(`[urlService.update] remove cache by decodeId: ${decodeId}`);
  if (urlDto.url) {
    urlCheck(urlDto);
  }
  await memoryCache.del(decodeId);
  const urlEntity = await getByDecodeId(decodeId);
  await getRepository(UrlEntity).update(urlEntity.id, urlDto);
  console.log(`[urlService.update] urlEntity update by decodeId: ${decodeId}`);
  return urlDto;
};

export default {
  get,
  save,
  update,
};
