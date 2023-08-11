/**
 * 피그마 API를 이용해 디자이너가 만든 icon을 생성하는 스크립트 입니다.
 *
 * 참고 자료: https://velog.io/@jun094/Figma-API%EB%A1%9C-storybook%EA%B3%BC-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%8F%99%EA%B8%B0%ED%99%94%EC%8B%9C%ED%82%A4%EA%B8%B0
 */
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Figma Personal Access Token
const accessToken = '';

// Figma File ID (아이콘이 포함된 파일의 ID)
const fileId = '';

// Figma Node ID (아이콘의 Node ID)
const nodeId = '';

// Figma API URL
const baseUrl = 'https://api.figma.com/v1';

// Headers에 Authorization 정보 추가
const headers = {
  'X-Figma-Token': accessToken,
};

const getComponentInfo = async () => {
  const url = `${baseUrl}/files/${fileId}/nodes?ids=${nodeId}`;

  const { data: info } = await axios.get(url, { headers });

  return Object.fromEntries(
    Object.entries(info.nodes[nodeId.replace('-', ':')].components).filter(
      ([key, component]) => {
        return /^ic-/.test(component.name);
      }
    )
  );
};

const getComponentDownloadURL = async (components) => {
  const ids = Object.keys(components).join(',');

  const url = `${baseUrl}/images/${fileId}?ids=${ids}&format=svg&svg_include_id=false`;

  const { data } = await axios.get(url, { headers });

  return data.images;
};

const downloadSvgFiles = async (urls, components) => {
  // 파일의 폴더 경로 추출
  const fileDir = path.dirname(__dirname + '/assets/icons/test.svg');

  // 폴더 생성
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
  }

  const actions = Object.entries(urls).map(async ([key, url]) => {
    const { data } = await axios.get(url);

    fs.writeFileSync(
      `${__dirname}/assets/icons/${components[key].name}.svg`,
      data,
      'utf-8'
    );

    console.log(`${components[key].name}.svg 다운로드 완료`);
  });

  await Promise.all(actions);
};

const createIconTypesFile = (components) => {
  const types = Object.values(components)
    .map((c) => `'${c.name}'`)
    .join(' | ');

  fs.writeFileSync(
    `${__dirname}/icon.types.ts`,
    `export type IconTypes = ${types}`,
    'utf-8'
  );
};

const download = async () => {
  const components = await getComponentInfo();
  const urls = await getComponentDownloadURL(components);

  await downloadSvgFiles(urls, components);
  console.log('[SVG] 다운로드 완료!!');

  createIconTypesFile(components);
  console.log('[typescript] 파일 생성 완료');
};

download();
