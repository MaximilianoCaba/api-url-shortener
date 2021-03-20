import urlService from '../../src/service/urlService';
import { getRepository } from 'typeorm';
import UrlEntity from '../../src/entity/urlEntity';
import base62 from 'base62';

describe('Url Service Tests', () => {
  describe('save', () => {
    test('when have valid url, return shortener url', async (done) => {
      const urlToRedirect = 'https://www.google.com.ar';

      const url = await urlService.save({ url: urlToRedirect });

      const urlEntity = await getRepository(UrlEntity).findOne({ where: { url: urlToRedirect } });
      const encodedId = base62.encode(urlEntity.id);

      expect(urlToRedirect).toBe(urlEntity.url);
      expect(url).toBe('jest/' + encodedId);
      done();
    });

    test('when have invalid valid url, throw error', async (done) => {
      try {
        const urlToRedirect = 'google.com.ar';
        await urlService.save({ url: urlToRedirect });
      } catch (error) {
        expect(error).not.toBe(null);
      } finally {
        done();
      }
    });
  });

  describe('get', () => {
    test('when have valid url, return original url', async (done) => {
      const urlToRedirect = 'https://www.google.com.ar';
      const urlEntity = await getRepository(UrlEntity).save({ id: 1000, url: urlToRedirect });
      const encodedId = base62.encode(urlEntity.id);

      const url = await urlService.get(encodedId);

      expect(url).toBe(urlToRedirect);
      done();
    });

    test('when have invalid url, throw error', async (done) => {
      try {
        const encodedId = base62.encode(99999);
        await urlService.get(encodedId);
      } catch (error) {
        expect(error).not.toBe(null);
      } finally {
        done();
      }
    });

    test('when have url and this is disabled, throw error', async (done) => {
      try {
        const urlToRedirect = 'https://www.google.com.ar';
        const urlEntity = await getRepository(UrlEntity).save({
          id: 2000,
          url: urlToRedirect,
          enabled: false,
        });
        const encodedId = base62.encode(urlEntity.id);

        await urlService.get(encodedId);
      } catch (error) {
        expect(error).not.toBe(null);
      } finally {
        done();
      }
    });
  });

  describe('put', () => {
    test('when have valid url, return url updated', async (done) => {
      const urlToRedirect = 'https://www.google.com.ar';
      const newUrl = 'https://www.google.com.ru';
      const urlEntity = await getRepository(UrlEntity).save({ url: urlToRedirect });
      const encodedId = base62.encode(urlEntity.id);

      const { url } = await urlService.update(encodedId, { url: newUrl });

      expect(url).toBe(newUrl);
      done();
    });

    test('when have invalid url, throw error', async (done) => {
      try {
        const urlToRedirect = 'https://www.google.com.ar';
        const newUrl = 'google.ru';
        const urlEntity = await getRepository(UrlEntity).save({ url: urlToRedirect });
        const encodedId = base62.encode(urlEntity.id);
        await urlService.update(encodedId, { url: newUrl });
      } catch (error) {
        expect(error).not.toBe(null);
      } finally {
        done();
      }
    });

    test('when have valid enabled, return url updated', async (done) => {
      const urlToRedirect = 'https://www.google.com.ar';
      const urlEntity = await getRepository(UrlEntity).save({ url: urlToRedirect });
      const encodedId = base62.encode(urlEntity.id);

      const { enabled } = await urlService.update(encodedId, { enabled: false });

      expect(enabled).toBe(false);
      done();
    });
  });
});
