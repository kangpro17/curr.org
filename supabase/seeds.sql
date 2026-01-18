-- Seed Data for Curriculum Learning Resources
-- Based on 2022 Revised Curriculum Standards

-- 9국01-01 (듣기·말하기: 상대의 성별, 세대, 지위 등을 고려하여 예절을 갖추어 대화한다.)
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-01', '상황에 맞는 언어 예절 - 대화의 기초', 'https://mid.ebs.co.kr', '영상 강의', 'EBS 중학프리미엄', ARRAY['언어예절', '의사소통'], true),
('9국01-01', '중학 국어 언어 예절과 대화 원리', 'https://www.youtube.com/results?search_query=중학+국어+언어+예절', '학습 영상', 'YouTube', ARRAY['예절', '대화'], true),
('9국01-01', '언어 예절 평가 자료 및 학습지', 'https://www.edunet.net', '학습지', '에듀넷', ARRAY['평가', '학습자료'], true);

-- 9국01-02 (듣기·말하기: 매체에 나타난 정보의 타당성을 판단하며 듣는다.)
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-02', '매체 비판적으로 읽기 - 정보의 신뢰성과 타당성', 'https://mid.ebs.co.kr', '영상 강의', 'EBS 중학프리미엄', ARRAY['매체비평', '비판적사고'], true),
('9국01-02', '뉴스 정보의 타당성 판단하기', 'https://www.youtube.com/results?search_query=9국01-02+매체+정보+타당성', '학습 영상', 'YouTube', ARRAY['뉴스분석', '비판적듣기'], true);

-- 9국02-01 (읽기: 독서의 가치와 즐거움을 깨닫고 독서를 생활화하는 태도를 지닌다.)
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국02-01', '독서의 즐거움과 아침 독서의 가치', 'https://www.edunet.net', '읽기 자료', '에듀넷', ARRAY['독서습관', '평생학습'], true),
('9국02-01', '나를 성장시키는 독서의 힘', 'https://www.youtube.com/results?search_query=중학+국어+독서의+가치', '동기부여 영상', 'YouTube', ARRAY['독서교육', '자기계발'], true);
