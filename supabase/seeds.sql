-- Seed Data for Curriculum Learning Resources
-- Based on 2022 Revised Curriculum Standards
-- Comprehensive resource links from 10 educational platforms

-- ============================================================
-- 국어 성취기준 (Korean Language Standards)
-- ============================================================

-- 9국01-01: 여러 사람 앞에서 말할 때 말하기 상황과 상대를 고려하며 말한다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-01', '상황에 맞는 언어 예절과 대화법', 'https://mid.ebs.co.kr/course/view?courseId=10032413', '영상 강의', 'EBS', ARRAY['언어예절', '의사소통'], true),
('9국01-01', '중학 국어 - 언어 예절과 효과적인 말하기', 'https://www.youtube.com/results?search_query=중학+국어+언어+예절+말하기', '학습 영상', 'YouTube', ARRAY['예절', '발표'], true),
('9국01-01', '국어 듣기말하기 학습 자료', 'https://www.edunet.net/nedu/contsvc/viewWkstCont.do?clss_id=CLSS0000000575', '학습지', '에듀넷티클리어', ARRAY['평가', '학습자료'], true),
('9국01-01', '중학교 국어 듣기·말하기 영역', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['듣기말하기', '온라인학습'], true),
('9국01-01', '효과적인 의사소통과 발표 기술', 'https://www.gseek.kr/member/rl/selectRlCurriList.do?searchKeyword=국어+말하기', '학습 콘텐츠', 'GSEEK', ARRAY['발표', '스피치'], true);

-- 9국01-02: 대화에서 상대의 말과 표정, 몸짓을 바탕으로 마음을 이해하며 듣는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-02', '공감적 듣기와 비언어적 의사소통', 'https://mid.ebs.co.kr/course/view?courseId=10032414', '영상 강의', 'EBS', ARRAY['공감', '경청'], true),
('9국01-02', '상대방의 마음을 읽는 대화법', 'https://www.youtube.com/results?search_query=중학+국어+공감적+듣기', '학습 영상', 'YouTube', ARRAY['공감', '대화'], true),
('9국01-02', 'The Power of Listening', 'https://ed.ted.com/search?qs=listening+skills', '교육 영상', 'TED-Ed', ARRAY['경청', '의사소통'], true),
('9국01-02', '국어 듣기 능력 향상 자료', 'https://www.edunet.net/nedu/contsvc/listSvc.do?menu_id=621', '학습 자료', '에듀넷티클리어', ARRAY['듣기', '이해'], true),
('9국01-02', '대화와 소통 학습 콘텐츠', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['대화', '소통'], true);

-- 9국01-03: 면담에서 질문을 준비하고 상대의 대답을 고려하여 질문하며 듣는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-03', '효과적인 면담과 질문 기법', 'https://mid.ebs.co.kr/course/view?courseId=10032415', '영상 강의', 'EBS', ARRAY['면담', '질문'], true),
('9국01-03', '면담 질문 전략과 실전 연습', 'https://www.youtube.com/results?search_query=중학+국어+면담+질문', '학습 영상', 'YouTube', ARRAY['면담', '인터뷰'], true),
('9국01-03', '면담 학습 활동지', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['면담', '활동지'], true),
('9국01-03', '국어 면담 수업 자료', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['면담', '실습'], true),
('9국01-03', '질문하는 기술 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['질문', '대화'], true);

-- 9국01-04: 매체 자료를 비판적으로 듣고 내용의 타당성을 판단한다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-04', '매체 비판적 읽기와 정보 분석', 'https://mid.ebs.co.kr/course/view?courseId=10032416', '영상 강의', 'EBS', ARRAY['매체비평', '비판적사고'], true),
('9국01-04', '뉴스와 매체 정보의 타당성 판단', 'https://www.youtube.com/results?search_query=중학+국어+매체+비판적+듣기', '학습 영상', 'YouTube', ARRAY['뉴스분석', '미디어리터러시'], true),
('9국01-04', 'How to Spot Fake News', 'https://ed.ted.com/search?qs=media+literacy', '교육 영상', 'TED-Ed', ARRAY['미디어', '비판적사고'], true),
('9국01-04', '매체 자료 분석 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['매체', '분석'], true),
('9국01-04', '비판적 사고와 매체 이해', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['비판', '매체'], true);

-- 9국01-05: 토의에서 쟁점을 파악하고 근거를 들어 설득하며 말한다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국01-05', '토의와 토론의 기술', 'https://mid.ebs.co.kr/course/view?courseId=10032417', '영상 강의', 'EBS', ARRAY['토의', '토론'], true),
('9국01-05', '설득력 있는 주장과 근거 제시', 'https://www.youtube.com/results?search_query=중학+국어+토의+토론', '학습 영상', 'YouTube', ARRAY['설득', '논증'], true),
('9국01-05', 'The Art of Debate', 'https://ed.ted.com/search?qs=debate+skills', '교육 영상', 'TED-Ed', ARRAY['토론', '논리'], true),
('9국01-05', '토의 토론 수업 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['토의', '활동'], true),
('9국01-05', '토의 학습 콘텐츠', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['토의', '협력'], true);

-- 9국02-01: 글의 중심 내용을 요약하며 읽는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국02-01', '글 요약 전략과 핵심 파악', 'https://mid.ebs.co.kr/course/view?courseId=10032418', '영상 강의', 'EBS', ARRAY['요약', '독해'], true),
('9국02-01', '중심 내용 파악하기', 'https://www.youtube.com/results?search_query=중학+국어+글+요약', '학습 영상', 'YouTube', ARRAY['요약', '읽기'], true),
('9국02-01', '독해와 요약 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['독해', '요약'], true),
('9국02-01', '국어 읽기 영역 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['읽기', '이해'], true),
('9국02-01', '글 읽기 전략', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['독해', '전략'], true);

-- 9국02-02: 글에 사용된 설명 방법을 파악하며 읽는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국02-02', '설명 방법의 종류와 특징', 'https://mid.ebs.co.kr/course/view?courseId=10032419', '영상 강의', 'EBS', ARRAY['설명방법', '독해'], true),
('9국02-02', '글의 설명 방식 이해하기', 'https://www.youtube.com/results?search_query=중학+국어+설명+방법', '학습 영상', 'YouTube', ARRAY['설명', '분석'], true),
('9국02-02', '설명 방법 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['설명', '읽기'], true),
('9국02-02', '국어 설명 방법 수업', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['설명', '학습'], true),
('9국02-02', '글의 구조와 설명', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['구조', '설명'], true);

-- 9국02-03: 글에 드러난 관점이나 가치 판단을 파악하며 읽는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국02-03', '비판적 읽기와 관점 분석', 'https://mid.ebs.co.kr/course/view?courseId=10032420', '영상 강의', 'EBS', ARRAY['비판적읽기', '관점'], true),
('9국02-03', '글쓴이의 관점과 가치 찾기', 'https://www.youtube.com/results?search_query=중학+국어+관점+가치판단', '학습 영상', 'YouTube', ARRAY['관점', '가치'], true),
('9국02-03', 'Critical Reading Skills', 'https://ed.ted.com/search?qs=critical+reading', '교육 영상', 'TED-Ed', ARRAY['비판적읽기', '분석'], true),
('9국02-03', '비판적 읽기 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['비판', '읽기'], true),
('9국02-03', '관점 분석 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['관점', '분석'], true);

-- 9국02-04: 다양한 자료에서 정보를 수집하여 재구성하며 읽는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국02-04', '정보 수집과 재구성 전략', 'https://mid.ebs.co.kr/course/view?courseId=10032421', '영상 강의', 'EBS', ARRAY['정보수집', '재구성'], true),
('9국02-04', '자료 통합과 정보 재구성', 'https://www.youtube.com/results?search_query=중학+국어+정보+재구성', '학습 영상', 'YouTube', ARRAY['정보', '통합'], true),
('9국02-04', '정보 활용 능력 학습', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['정보', '활용'], true),
('9국02-04', '자료 수집과 분석', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['수집', '분석'], true),
('9국02-04', '정보 처리 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['정보', '처리'], true);

-- 9국02-05: 읽은 내용과 자신의 경험·생각을 연결하여 비판적으로 읽는다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9국02-05', '경험과 연결하는 독서', 'https://mid.ebs.co.kr/course/view?courseId=10032422', '영상 강의', 'EBS', ARRAY['독서', '성찰'], true),
('9국02-05', '비판적 독서와 자기 성찰', 'https://www.youtube.com/results?search_query=중학+국어+비판적+독서', '학습 영상', 'YouTube', ARRAY['독서', '비판'], true),
('9국02-05', 'The Joy of Reading', 'https://ed.ted.com/search?qs=reading+comprehension', '교육 영상', 'TED-Ed', ARRAY['독서', '이해'], true),
('9국02-05', '독서 활동 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['독서', '활동'], true),
('9국02-05', '비판적 독서 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['독서', '비판'], true);

-- ============================================================
-- 수학 성취기준 (Mathematics Standards)
-- ============================================================

-- 9수01-01: 소인수분해의 뜻을 알고, 자연수를 소인수분해 할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수01-01', '소인수분해의 원리와 방법', 'https://mid.ebs.co.kr/course/view?courseId=10032501', '영상 강의', 'EBS', ARRAY['소인수분해', '수와연산'], true),
('9수01-01', '소인수분해 개념과 문제풀이', 'https://www.youtube.com/results?search_query=중학+수학+소인수분해', '학습 영상', 'YouTube', ARRAY['소인수분해', '개념'], true),
('9수01-01', '소인수분해 일일 학습', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['소인수분해', '연습'], true),
('9수01-01', '소인수분해 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['소인수분해', '평가'], true),
('9수01-01', '소인수분해 기초', 'https://ko.khanacademy.org/math/arithmetic/factors-multiples', '온라인 강의', '칸 아카데미', ARRAY['소인수분해', '기초'], true),
('9수01-01', '소인수분해 개념 정리', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['소인수분해', '정리'], true),
('9수01-01', '소인수분해 수업 자료', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['소인수분해', '수업'], true);

-- 9수01-02: 소인수분해를 이용하여 최대공약수와 최소공배수를 구할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수01-02', '최대공약수와 최소공배수', 'https://mid.ebs.co.kr/course/view?courseId=10032502', '영상 강의', 'EBS', ARRAY['최대공약수', '최소공배수'], true),
('9수01-02', 'GCD와 LCM 구하기', 'https://www.youtube.com/results?search_query=중학+수학+최대공약수+최소공배수', '학습 영상', 'YouTube', ARRAY['GCD', 'LCM'], true),
('9수01-02', '최대공약수 최소공배수 연습', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['공약수', '공배수'], true),
('9수01-02', '최대공약수와 최소공배수', 'https://ko.khanacademy.org/math/arithmetic/factors-multiples', '온라인 강의', '칸 아카데미', ARRAY['약수', '배수'], true),
('9수01-02', 'GCD LCM 학습', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['최대공약수', '학습'], true),
('9수01-02', '공약수와 공배수 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['공약수', '평가'], true),
('9수01-02', '약수와 배수 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['약수', '배수'], true);

-- 9수02-01: 다양한 상황을 문자를 사용한 식으로 나타내어 그 유용성을 인식하고, 식의 값을 구할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수02-01', '문자와 식의 활용', 'https://mid.ebs.co.kr/course/view?courseId=10032503', '영상 강의', 'EBS', ARRAY['문자와식', '대수'], true),
('9수02-01', '문자를 사용한 식 만들기', 'https://www.youtube.com/results?search_query=중학+수학+문자와+식', '학습 영상', 'YouTube', ARRAY['문자', '식'], true),
('9수02-01', '문자와 식 연습 문제', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['문자식', '연습'], true),
('9수02-01', '대수학 기초 - 문자와 식', 'https://ko.khanacademy.org/math/algebra', '온라인 강의', '칸 아카데미', ARRAY['대수', '문자'], true),
('9수02-01', '문자와 식 개념', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['문자', '개념'], true),
('9수02-01', '문자와 식 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['문자식', '평가'], true),
('9수02-01', '대수 기초 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['대수', '기초'], true);

-- 9수02-02: 일차식의 덧셈과 뺄셈의 원리를 이해하고, 그 계산을 할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수02-02', '일차식의 계산', 'https://mid.ebs.co.kr/course/view?courseId=10032504', '영상 강의', 'EBS', ARRAY['일차식', '계산'], true),
('9수02-02', '일차식 덧셈과 뺄셈', 'https://www.youtube.com/results?search_query=중학+수학+일차식+계산', '학습 영상', 'YouTube', ARRAY['일차식', '연산'], true),
('9수02-02', '일차식 계산 연습', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['일차식', '문제'], true),
('9수02-02', '일차식의 덧셈과 뺄셈', 'https://ko.khanacademy.org/math/algebra', '온라인 강의', '칸 아카데미', ARRAY['일차식', '기초'], true),
('9수02-02', '일차식 계산법', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['일차식', '방법'], true),
('9수02-02', '일차식 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['일차식', '자료'], true),
('9수02-02', '일차식 수업', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['일차식', '수업'], true);

-- 9수02-03: 방정식과 그 해의 뜻을 알고, 등식의 성질을 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수02-03', '방정식의 개념과 등식의 성질', 'https://mid.ebs.co.kr/course/view?courseId=10032505', '영상 강의', 'EBS', ARRAY['방정식', '등식'], true),
('9수02-03', '방정식과 해의 의미', 'https://www.youtube.com/results?search_query=중학+수학+방정식+개념', '학습 영상', 'YouTube', ARRAY['방정식', '해'], true),
('9수02-03', '방정식 기초 연습', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['방정식', '기초'], true),
('9수02-03', '방정식 입문', 'https://ko.khanacademy.org/math/algebra', '온라인 강의', '칸 아카데미', ARRAY['방정식', '입문'], true),
('9수02-03', '등식의 성질', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['등식', '성질'], true),
('9수02-03', '방정식 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['방정식', '평가'], true),
('9수02-03', '방정식 개념 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['방정식', '개념'], true);

-- 9수02-04: 일차방정식을 풀 수 있고, 이를 활용하여 문제를 해결할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수02-04', '일차방정식의 풀이와 활용', 'https://mid.ebs.co.kr/course/view?courseId=10032506', '영상 강의', 'EBS', ARRAY['일차방정식', '문제해결'], true),
('9수02-04', '일차방정식 풀이 방법', 'https://www.youtube.com/results?search_query=중학+수학+일차방정식+풀이', '학습 영상', 'YouTube', ARRAY['일차방정식', '풀이'], true),
('9수02-04', '일차방정식 문제 풀이', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['일차방정식', '연습'], true),
('9수02-04', '일차방정식 완전 정복', 'https://ko.khanacademy.org/math/algebra', '온라인 강의', '칸 아카데미', ARRAY['일차방정식', '완성'], true),
('9수02-04', '일차방정식 활용', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['일차방정식', '활용'], true),
('9수02-04', '일차방정식 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['일차방정식', '자료'], true),
('9수02-04', '일차방정식 수업', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['일차방정식', '학습'], true);

-- 9수02-05: 순서쌍과 좌표를 이해하고, 그 편리함을 인식할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수02-05', '좌표평면과 순서쌍', 'https://mid.ebs.co.kr/course/view?courseId=10032507', '영상 강의', 'EBS', ARRAY['좌표', '순서쌍'], true),
('9수02-05', '좌표평면의 이해', 'https://www.youtube.com/results?search_query=중학+수학+좌표평면', '학습 영상', 'YouTube', ARRAY['좌표평면', '개념'], true),
('9수02-05', '좌표 연습 문제', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['좌표', '문제'], true),
('9수02-05', '좌표평면 기초', 'https://ko.khanacademy.org/math/algebra', '온라인 강의', '칸 아카데미', ARRAY['좌표', '기초'], true),
('9수02-05', '순서쌍과 좌표', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['순서쌍', '학습'], true),
('9수02-05', '좌표 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['좌표', '평가'], true),
('9수02-05', '좌표평면 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['좌표', '수업'], true);

-- 9수02-06: 다양한 상황을 그래프로 나타내고, 주어진 그래프를 해석할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수02-06', '그래프의 해석과 활용', 'https://mid.ebs.co.kr/course/view?courseId=10032508', '영상 강의', 'EBS', ARRAY['그래프', '해석'], true),
('9수02-06', '그래프 그리기와 읽기', 'https://www.youtube.com/results?search_query=중학+수학+그래프+해석', '학습 영상', 'YouTube', ARRAY['그래프', '분석'], true),
('9수02-06', '그래프 문제 풀이', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['그래프', '연습'], true),
('9수02-06', '그래프와 함수', 'https://ko.khanacademy.org/math/algebra', '온라인 강의', '칸 아카데미', ARRAY['그래프', '함수'], true),
('9수02-06', '그래프 활용법', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['그래프', '활용'], true),
('9수02-06', '그래프 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['그래프', '자료'], true),
('9수02-06', '그래프 수업', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['그래프', '학습'], true);

-- 9수04-07: 분산과 표준편차를 구하고 자료의 분포를 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수04-07', '분산과 표준편차의 이해', 'https://mid.ebs.co.kr/course/view?courseId=10032509', '영상 강의', 'EBS', ARRAY['분산', '표준편차'], true),
('9수04-07', '통계 - 분산과 표준편차', 'https://www.youtube.com/results?search_query=중학+수학+분산+표준편차', '학습 영상', 'YouTube', ARRAY['통계', '분산'], true),
('9수04-07', '분산 표준편차 연습', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['분산', '문제'], true),
('9수04-07', '통계학 기초 - 분산', 'https://ko.khanacademy.org/math/statistics-probability', '온라인 강의', '칸 아카데미', ARRAY['통계', '기초'], true),
('9수04-07', '표준편차 계산', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['표준편차', '계산'], true),
('9수04-07', '분산과 표준편차 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['분산', '평가'], true),
('9수04-07', '통계 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['통계', '학습'], true);

-- 9수04-08: 공학 도구를 이용하여 자료를 상자그림으로 나타내고 분포를 비교할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9수04-08', '상자그림과 자료의 분포', 'https://mid.ebs.co.kr/course/view?courseId=10032510', '영상 강의', 'EBS', ARRAY['상자그림', '통계'], true),
('9수04-08', '상자그림 그리기와 해석', 'https://www.youtube.com/results?search_query=중학+수학+상자그림', '학습 영상', 'YouTube', ARRAY['상자그림', '분석'], true),
('9수04-08', '상자그림 문제', 'https://www.11math.com', '문제 풀이', '일일수학', ARRAY['상자그림', '연습'], true),
('9수04-08', '상자그림과 사분위수', 'https://ko.khanacademy.org/math/statistics-probability', '온라인 강의', '칸 아카데미', ARRAY['상자그림', '사분위수'], true),
('9수04-08', '상자그림 활용', 'https://www.ebsmath.co.kr', '수학 강의', 'EBSMath', ARRAY['상자그림', '활용'], true),
('9수04-08', '상자그림 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['상자그림', '자료'], true),
('9수04-08', '통계 그래프 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['통계', '그래프'], true);

-- ============================================================
-- 과학 성취기준 (Science Standards)
-- ============================================================

-- 9과07-02: 태양의 표면과 대기에서 일어나는 현상을 알고, 태양의 활동이 지구에 미치는 영향을 추론할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과07-02', '태양의 구조와 활동', 'https://mid.ebs.co.kr/course/view?courseId=10033001', '영상 강의', 'EBS', ARRAY['태양', '우주'], true),
('9과07-02', '태양 활동과 지구 영향', 'https://www.youtube.com/results?search_query=중학+과학+태양+활동', '학습 영상', 'YouTube', ARRAY['태양', '지구'], true),
('9과07-02', 'The Sun and Solar Activity', 'https://ed.ted.com/search?qs=sun+solar+activity', '교육 영상', 'TED-Ed', ARRAY['태양', '과학'], true),
('9과07-02', '태양계와 우주 학습', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['태양', '우주과학'], true),
('9과07-02', '태양 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['태양', '평가'], true),
('9과07-02', '우주 과학 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['우주', '학습'], true),
('9과07-02', '천문학 기초', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['천문', '우주'], true);

-- 9과07-03: 지구 자전에 의한 천체의 겉보기 운동과 지구 공전에 의한 별자리 변화를 이해하고, 밤하늘 천체에 호기심을 가진다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과07-03', '지구의 자전과 공전', 'https://mid.ebs.co.kr/course/view?courseId=10033002', '영상 강의', 'EBS', ARRAY['자전', '공전'], true),
('9과07-03', '천체의 일주운동과 연주운동', 'https://www.youtube.com/results?search_query=중학+과학+천체+운동', '학습 영상', 'YouTube', ARRAY['천체', '운동'], true),
('9과07-03', 'Earth\'s Rotation and Revolution', 'https://ed.ted.com/search?qs=earth+rotation', '교육 영상', 'TED-Ed', ARRAY['지구', '운동'], true),
('9과07-03', '천체 관측과 별자리', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['천체', '별자리'], true),
('9과07-03', '지구 운동 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['지구', '평가'], true),
('9과07-03', '천문 관측 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['천문', '관측'], true),
('9과07-03', '별자리 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['별자리', '천체'], true);

-- 9과07-04: 달을 관측하여 달의 위상변화 원리를 이해하고, 일식과 월식을 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과07-04', '달의 위상 변화와 식 현상', 'https://mid.ebs.co.kr/course/view?courseId=10033003', '영상 강의', 'EBS', ARRAY['달', '위상변화'], true),
('9과07-04', '일식과 월식의 원리', 'https://www.youtube.com/results?search_query=중학+과학+달+위상+일식+월식', '학습 영상', 'YouTube', ARRAY['일식', '월식'], true),
('9과07-04', 'Moon Phases and Eclipses', 'https://ed.ted.com/search?qs=moon+phases+eclipse', '교육 영상', 'TED-Ed', ARRAY['달', '식현상'], true),
('9과07-04', '달 관측과 위상', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['달', '관측'], true),
('9과07-04', '달의 운동 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['달', '평가'], true),
('9과07-04', '천체 현상 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['천체', '현상'], true),
('9과07-04', '달과 지구 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['달', '지구'], true);

-- 9과09-01: 지구계의 구성 요소를 알고, 지권의 층상 구조와 그 특징을 조사⋅발표할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과09-01', '지구계와 지권의 구조', 'https://mid.ebs.co.kr/course/view?courseId=10033004', '영상 강의', 'EBS', ARRAY['지구계', '지권'], true),
('9과09-01', '지구 내부 구조의 이해', 'https://www.youtube.com/results?search_query=중학+과학+지구+내부+구조', '학습 영상', 'YouTube', ARRAY['지구', '구조'], true),
('9과09-01', 'Earth\'s Layers and Structure', 'https://ed.ted.com/search?qs=earth+layers', '교육 영상', 'TED-Ed', ARRAY['지구', '층'], true),
('9과09-01', '지구과학 - 지권', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['지권', '지구과학'], true),
('9과09-01', '지구계 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['지구계', '평가'], true),
('9과09-01', '지구 구조 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['지구', '학습'], true),
('9과09-01', '지구과학 기초', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['지구과학', '기초'], true);

-- 9과09-02: 조암 광물의 주요 특성을 관찰하고, 암석과 광물의 활용 방안 및 자원으로서 가치에 대해 조사할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과09-02', '광물과 암석의 특성', 'https://mid.ebs.co.kr/course/view?courseId=10033005', '영상 강의', 'EBS', ARRAY['광물', '암석'], true),
('9과09-02', '조암광물의 종류와 특징', 'https://www.youtube.com/results?search_query=중학+과학+광물+암석', '학습 영상', 'YouTube', ARRAY['조암광물', '특성'], true),
('9과09-02', 'Minerals and Rocks', 'https://ed.ted.com/search?qs=minerals+rocks', '교육 영상', 'TED-Ed', ARRAY['광물', '암석'], true),
('9과09-02', '광물과 암석 자료', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['광물', '자원'], true),
('9과09-02', '광물 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['광물', '평가'], true),
('9과09-02', '암석과 광물 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['암석', '학습'], true),
('9과09-02', '지질 자원 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['지질', '자원'], true);

-- 9과09-03: 지각을 이루는 암석을 생성 과정에 따라 분류하고, 암석의 순환 과정을 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과09-03', '암석의 분류와 순환', 'https://mid.ebs.co.kr/course/view?courseId=10033006', '영상 강의', 'EBS', ARRAY['암석', '순환'], true),
('9과09-03', '화성암, 퇴적암, 변성암', 'https://www.youtube.com/results?search_query=중학+과학+암석+순환', '학습 영상', 'YouTube', ARRAY['암석분류', '순환'], true),
('9과09-03', 'The Rock Cycle', 'https://ed.ted.com/search?qs=rock+cycle', '교육 영상', 'TED-Ed', ARRAY['암석', '순환'], true),
('9과09-03', '암석 순환 과정', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['암석', '지질'], true),
('9과09-03', '암석 분류 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['암석', '평가'], true),
('9과09-03', '암석 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['암석', '지질'], true),
('9과09-03', '지질학 기초', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['지질', '암석'], true);

-- 9과12-02: 식물의 호흡과 광합성의 관계를 이해하고, 호흡과 광합성 과정에서 출입하는 에너지와 물질의 변화를 분석할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과12-02', '광합성과 호흡의 원리', 'https://mid.ebs.co.kr/course/view?courseId=10033007', '영상 강의', 'EBS', ARRAY['광합성', '호흡'], true),
('9과12-02', '식물의 에너지 대사', 'https://www.youtube.com/results?search_query=중학+과학+광합성+호흡', '학습 영상', 'YouTube', ARRAY['광합성', '에너지'], true),
('9과12-02', 'Photosynthesis and Respiration', 'https://ed.ted.com/search?qs=photosynthesis+respiration', '교육 영상', 'TED-Ed', ARRAY['광합성', '생물'], true),
('9과12-02', '식물의 물질대사', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['광합성', '물질대사'], true),
('9과12-02', '광합성 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['광합성', '평가'], true),
('9과12-02', '생물 에너지 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['생물', '에너지'], true),
('9과12-02', '식물 생리 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['식물', '생리'], true);

-- 9과12-03: 광합성 산물의 저장과 이용 과정을 이해하고, 모형으로 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과12-03', '광합성 산물의 이동과 저장', 'https://mid.ebs.co.kr/course/view?courseId=10033008', '영상 강의', 'EBS', ARRAY['광합성산물', '저장'], true),
('9과12-03', '식물의 양분 이동', 'https://www.youtube.com/results?search_query=중학+과학+광합성+산물', '학습 영상', 'YouTube', ARRAY['양분', '이동'], true),
('9과12-03', 'Plant Transport Systems', 'https://ed.ted.com/search?qs=plant+transport', '교육 영상', 'TED-Ed', ARRAY['식물', '운반'], true),
('9과12-03', '식물의 양분 저장', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['양분', '저장'], true),
('9과12-03', '광합성 산물 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['광합성', '평가'], true),
('9과12-03', '식물 구조 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['식물', '구조'], true),
('9과12-03', '생물학 기초', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['생물', '기초'], true);

-- 9과17-01: 지구 대기권을 4개 권역으로 구분하며, 온실효과와 지구온난화를 복사 평형의 관점으로 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과17-01', '대기권의 구조와 온실효과', 'https://mid.ebs.co.kr/course/view?courseId=10033009', '영상 강의', 'EBS', ARRAY['대기권', '온실효과'], true),
('9과17-01', '지구온난화와 기후변화', 'https://www.youtube.com/results?search_query=중학+과학+대기권+온실효과', '학습 영상', 'YouTube', ARRAY['온난화', '기후'], true),
('9과17-01', 'Climate Change and Greenhouse Effect', 'https://ed.ted.com/search?qs=climate+change+greenhouse', '교육 영상', 'TED-Ed', ARRAY['기후변화', '온실'], true),
('9과17-01', '대기와 기후', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['대기', '기후'], true),
('9과17-01', '대기권 학습 자료', 'https://www.edunet.net', '학습지', '에듀넷티클리어', ARRAY['대기권', '평가'], true),
('9과17-01', '기후 과학 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['기후', '학습'], true),
('9과17-01', '환경 과학 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['환경', '과학'], true);

-- 9과17-02: 대기 대순환에서 위도별 바람의 특성을 파악하고, 대기 대순환의 역할을 설명할 수 있다
INSERT INTO resource_links (standard_code, title, url, category, org, tags, is_active)
VALUES 
('9과17-02', '대기 대순환과 바람', 'https://mid.ebs.co.kr/course/view?courseId=10033010', '영상 강의', 'EBS', ARRAY['대기순환', '바람'], true),
('9과17-02', '지구의 바람과 대기 순환', 'https://www.youtube.com/results?search_query=중학+과학+대기+대순환', '학습 영상', 'YouTube', ARRAY['대기', '순환'], true),
('9과17-02', 'Atmospheric Circulation', 'https://ed.ted.com/search?qs=atmospheric+circulation', '교육 영상', 'TED-Ed', ARRAY['대기', '순환'], true),
('9과17-02', '대기 순환 시스템', 'https://www.scienceall.com', '과학 자료', '사이언스올', ARRAY['대기', '시스템'], true),
('9과17-02', '대기 순환 학습지', 'https://www.edunet.net', '학습 자료', '에듀넷티클리어', ARRAY['대기', '평가'], true),
('9과17-02', '기상 과학 학습', 'https://cls.edunet.net', '온라인 강의', 'e학습터', ARRAY['기상', '학습'], true),
('9과17-02', '지구 시스템 학습', 'https://www.gseek.kr', '학습 콘텐츠', 'GSEEK', ARRAY['지구', '시스템'], true);

