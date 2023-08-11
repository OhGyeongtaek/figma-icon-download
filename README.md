# Figma icon download script

Figma API를 활용해 디자이너가 figma 페이지에 등록한 아이콘을 생성하는 스크립트 입니다.

추가로 생성한 아이콘의 name값으로 icon의 타입을 정의하는 ts파일을 생성하도록 기능구현이 되어 있습니다.

필요없으신 경우는 아래의 로직을 제거해 주세요.

```typescript
createIconTypesFile(components);
console.log('[typescript] 파일 생성 완료');
```

# 작동 결과 이미지

![작동 결과 이미지](https://github.com/OhGyeongtaek/figma-icon-download/assets/20200820/405a2165-401f-4abc-bcbf-c0de89ba8dcd)

# API 키 등록 방법

## `accessToken` 값 등록

![accessToken 등록 방법 이미지](https://github.com/OhGyeongtaek/figma-icon-download/assets/20200820/69c171c6-ce06-441c-b9ae-2bbddc00966c)


1. Profile(Avatar) 
2. settings 
3. Account 
4. Personal access tokens 
5. Generate new token 클릭
6. Token name 입력

(저는 Expiration 값을 No Expiration으로 설정했습니다. 본인 상황에 맞게 설정하시면 될 거 같습니다.)

## `file-id & node-id` 값 등록

![file-id, node-id 정의하는 설명 이미지](https://github.com/OhGyeongtaek/figma-icon-download/assets/20200820/5347cc2d-864d-434e-85fb-2b3457ff6b68)

# 사용 방법

```sh
npm run download

# or 

yarn download
```

## 참고한 레퍼런스

* [Figma API로 Storybook 아이콘 동기화시키기](https://velog.io/@jun094/Figma-API%EB%A1%9C-storybook%EA%B3%BC-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%8F%99%EA%B8%B0%ED%99%94%EC%8B%9C%ED%82%A4%EA%B8%B0)
