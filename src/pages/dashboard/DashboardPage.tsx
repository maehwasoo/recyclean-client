import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  AlertCircle,
  Award,
  Calendar,
  Camera,
  Leaf,
  Lightbulb,
  MapPin,
  Recycle,
  RotateCcw,
  Target,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { Button } from "../../shared/ui/Button/Button";
import { Badge } from "../../shared/ui/Badge/Badge";
import type { BadgeTone } from "../../shared/ui/Badge/Badge";
import { Progress } from "../../shared/ui/Progress/Progress";
import { TextField } from "../../shared/ui/TextField/TextField";
import { ImageWithFallback } from "../../shared/media/ImageWithFallback/ImageWithFallback";
import { SelectField } from "../../shared/ui/SelectField/SelectField";

const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const WelcomeCard = styled(Card)`
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.14), rgba(56, 189, 248, 0.16));
  border-color: rgba(74, 222, 128, 0.45);
`;

const WelcomeContent = styled(CardContent)`
  padding: ${({ theme }) => theme.spacing(5)};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const WelcomeIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: rgba(34, 197, 94, 0.15);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StatCell = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const StatValue = styled.span<{ $tone: "success" | "info" | "warning" }>`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ $tone }) =>
    ({
      success: "#16a34a",
      info: "#0284c7",
      warning: "#ea580c"
    }[$tone])};
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const RecentActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ActivityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const AchievementRow = styled.div<{ $earned: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $earned }) =>
    $earned ? theme.colors.successSurface : theme.colors.surfaceMuted};
  border: 1px solid
    ${({ theme, $earned }) => ($earned ? "rgba(34, 197, 94, 0.35)" : theme.colors.border)};
`;

const QuickActionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const MaterialList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const MaterialItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const TipCard = styled(Card)`
  overflow: hidden;
`;

const TipMedia = styled.div`
  position: relative;
  height: 120px;
  width: 100%;
`;

const TipContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2.5)};
`;

const GoalCard = styled.div`
  background: ${({ theme }) => theme.colors.surfaceMuted};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const GoalProgress = styled.div`
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
`;

const GoalProgressBar = styled.div<{ $value: number }>`
  height: 100%;
  width: ${({ $value }) => Math.min(Math.max($value, 0), 100)}%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  transition: width 0.3s ease;
`;

const TrackerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const TrackerStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const TrackerValue = styled.span`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const TrackerLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HighlightBox = styled.div`
  background: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing(2.5)};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

interface RecentActivityItem {
  type: string;
  count: number;
  points: number;
  time: string;
}

interface AchievementItem {
  title: string;
  description: string;
  earned: boolean;
}

interface MaterialItemData {
  name: string;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

interface TipData {
  id: string;
  title: string;
  description: string;
  category: "reduce" | "reuse" | "recycle" | "energy";
  impact: "high" | "medium" | "low";
  difficulty: "easy" | "moderate" | "hard";
  image: string;
}

interface GoalData {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
}

interface RecyclingEntry {
  id: string;
  type: string;
  amount: number;
  date: Date;
  points: number;
}

const todayStats = {
  itemsRecycled: 12,
  pointsEarned: 24,
  streakDays: 7
};

const recentActivity: RecentActivityItem[] = [
  { type: "Plastic Bottles", count: 5, points: 10, time: "2시간 전" },
  { type: "Aluminum Cans", count: 3, points: 6, time: "어제" },
  { type: "Glass Jars", count: 2, points: 6, time: "2일 전" }
];

const achievements: AchievementItem[] = [
  { title: "Eco Warrior", description: "7일 연속 재활용 달성", earned: true },
  { title: "Bottle Buster", description: "500개의 병 처리", earned: true },
  { title: "Green Guardian", description: "누적 1,000 포인트 획득", earned: false }
];

const materials: MaterialItemData[] = [
  {
    name: "Plastic Bottles",
    recyclable: true,
    category: "Plastic",
    instructions: "라벨과 뚜껑을 제거하고 깨끗이 헹궈요.",
    tips: "바닥의 재활용 기호 #1, #2를 확인해요."
  },
  {
    name: "Glass Jars",
    recyclable: true,
    category: "Glass",
    instructions: "깨끗이 헹군 뒤 금속 뚜껑을 분리해요.",
    tips: "유리는 품질 저하 없이 여러 번 재활용돼요."
  },
  {
    name: "Pizza Boxes",
    recyclable: false,
    category: "Paper",
    instructions: "기름과 음식물이 묻어 재활용이 어려워요.",
    tips: "깨끗한 부분만 분리 배출하고 나머지는 일반 쓰레기로 버려요."
  },
  {
    name: "Aluminum Cans",
    recyclable: true,
    category: "Metal",
    instructions: "깨끗이 헹구고 눌러 부피를 줄여요.",
    tips: "가장 가치 있는 재활용 소재 중 하나예요."
  }
];

const tips: TipData[] = [
  {
    id: "1",
    title: "재사용 물병 활용",
    description: "일회용 플라스틱 병 대신 재사용 가능한 물병을 사용해요.",
    category: "reduce",
    impact: "high",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "2",
    title: "유리병 재활용 아이디어",
    description: "빈 유리병을 수납 용기나 화분으로 재활용해요.",
    category: "reuse",
    impact: "medium",
    difficulty: "easy",
    image: "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "3",
    title: "배터리 올바른 처리",
    description: "배터리는 지정된 수거함에 배출해야 해요.",
    category: "recycle",
    impact: "high",
    difficulty: "moderate",
    image: "https://images.unsplash.com/photo-1579756423478-02bc82a97679?auto=format&fit=crop&w=1080&q=80"
  }
];

const goals: GoalData[] = [
  {
    id: "1",
    title: "플라스틱 소비 감축",
    description: "일회용 플라스틱 제품 사용 줄이기",
    target: 50,
    current: 32,
    unit: "개",
    deadline: "1월 말"
  },
  {
    id: "2",
    title: "재활용 연속 기록",
    description: "연속 재활용 활동 일수",
    target: 30,
    current: 12,
    unit: "일",
    deadline: "2월 말"
  }
];

const initialEntries: RecyclingEntry[] = [
  {
    id: "1",
    type: "Plastic Bottles",
    amount: 5,
    date: new Date(2025, 0, 3),
    points: 10
  },
  {
    id: "2",
    type: "Aluminum Cans",
    amount: 8,
    date: new Date(2025, 0, 2),
    points: 16
  },
  {
    id: "3",
    type: "Glass Jars",
    amount: 3,
    date: new Date(2025, 0, 1),
    points: 9
  }
];

const materialFilters = [
  { value: "all", label: "전체" },
  { value: "Plastic", label: "Plastic" },
  { value: "Glass", label: "Glass" },
  { value: "Metal", label: "Metal" },
  { value: "Paper", label: "Paper" }
];

const tipCategories = [
  { value: "reduce", label: "줄이기" },
  { value: "reuse", label: "재사용" },
  { value: "recycle", label: "재활용" },
  { value: "energy", label: "에너지" }
];

function categoryTone(category: string): BadgeTone {
  switch (category) {
    case "reduce":
      return "danger";
    case "reuse":
      return "info";
    case "recycle":
      return "success";
    case "energy":
      return "warning";
    default:
      return "neutral";
  }
}

export function DashboardPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [materialCategory, setMaterialCategory] = useState<string>("all");
  const [entries] = useState(initialEntries);
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>("all");

  const filteredMaterials = useMemo(() => {
    return materials.filter((material) => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        materialCategory === "all" || material.category === materialCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, materialCategory]);

  const filteredTips = useMemo(() => {
    if (selectedTipCategory === "all") return tips;
    return tips.filter((tip) => tip.category === selectedTipCategory);
  }, [selectedTipCategory]);

  const totalPoints = entries.reduce((sum, entry) => sum + entry.points, 0);
  const totalItems = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const categoryCount = new Set(entries.map((entry) => entry.type)).size;
  const monthlyGoal = 100;
  const progressValue = (totalPoints / monthlyGoal) * 100;

  return (
    <PageContainer>
      <WelcomeCard>
        <WelcomeContent>
          <WelcomeIcon>
            <Recycle size={28} color="#15803d" />
          </WelcomeIcon>
          <div>
            <h2>오늘도 환경을 지켜요!</h2>
            <p>꾸준한 실천으로 녹색 행성을 만드는 중이에요.</p>
          </div>
          <StatsGrid>
            <StatCell>
              <StatValue $tone="success">{todayStats.itemsRecycled}</StatValue>
              <StatLabel>오늘 처리한 아이템</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue $tone="info">{todayStats.pointsEarned}</StatValue>
              <StatLabel>획득 포인트</StatLabel>
            </StatCell>
            <StatCell>
              <StatValue $tone="warning">{todayStats.streakDays}</StatValue>
              <StatLabel>연속 참여 일수</StatLabel>
            </StatCell>
          </StatsGrid>
        </WelcomeContent>
      </WelcomeCard>

      <Card>
        <CardHeader>
          <CardTitle>
            <Target size={18} />
            월간 목표 진행도
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div style={{ fontWeight: 600, fontSize: "1rem" }}>{totalPoints} / {monthlyGoal} 포인트</div>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.85rem" }}>2025년 1월 기준</p>
          </div>
          <Progress value={progressValue} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
            <span style={{ color: "#64748b" }}>{Math.round(progressValue)}% 달성</span>
            <span style={{ color: "#16a34a", fontWeight: 600 }}>좋은 속도예요!</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Camera size={18} />
            빠른 작업
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuickActionGrid>
            <Button onClick={() => navigate("/analyze")} variant="outline">
              <Camera size={18} />
              AI로 즉시 분류
            </Button>
            <Button onClick={() => navigate("/map")} variant="outline">
              <MapPin size={18} />
              주변 배출함 찾기
            </Button>
            <Button variant="outline">
              <TrendingUp size={18} />
              수동 기록 추가
            </Button>
          </QuickActionGrid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Calendar size={18} />
            최근 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivityList>
            {recentActivity.map((activity) => (
              <ActivityRow key={activity.type}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{activity.type}</div>
                  <div style={{ color: "#64748b", fontSize: "0.8rem" }}>
                    {activity.count}개 · {activity.time}
                  </div>
                </div>
                <Badge tone="primary">+{activity.points} pts</Badge>
              </ActivityRow>
            ))}
          </RecentActivityList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Award size={18} />
            업적 모음
          </CardTitle>
        </CardHeader>
        <CardContent style={{ gap: "16px" }}>
          {achievements.map((achievement) => (
            <AchievementRow key={achievement.title} $earned={achievement.earned}>
              <Award size={20} color={achievement.earned ? "#15803d" : "#94a3b8"} />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{achievement.title}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{achievement.description}</div>
              </div>
              {achievement.earned && <Badge tone="success">달성</Badge>}
            </AchievementRow>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Lightbulb size={18} />
            재활용 정보 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TextField
            placeholder="재질 또는 물품명을 검색해요"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            startIcon={<Leaf size={16} />}
          />
          <SelectField
            options={materialFilters}
            value={materialCategory}
            onChange={(event) => setMaterialCategory(event.target.value)}
          />
          <MaterialList>
            {filteredMaterials.map((material) => (
              <MaterialItem key={material.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Badge tone={material.recyclable ? "success" : "danger"}>
                      {material.recyclable ? "재활용 가능" : "불가"}
                    </Badge>
                    <span style={{ fontWeight: 600 }}>{material.name}</span>
                  </div>
                  <Badge variant="outline">{material.category}</Badge>
                </div>
                <p style={{ margin: 0, color: "#475569", fontSize: "0.85rem" }}>{material.instructions}</p>
                {material.tips && (
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                      background: "#eff6ff",
                      borderRadius: "12px",
                      padding: "8px 10px",
                      color: "#1d4ed8",
                      fontSize: "0.8rem"
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{material.tips}</span>
                  </div>
                )}
              </MaterialItem>
            ))}
            {filteredMaterials.length === 0 && (
              <p style={{ textAlign: "center", color: "#64748b", margin: 0 }}>
                조건에 맞는 결과가 없어요.
              </p>
            )}
          </MaterialList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Target size={18} />
            지속가능성 목표
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GoalsList>
            {goals.map((goal) => {
              const percentage = Math.round((goal.current / goal.target) * 100);
              return (
                <GoalCard key={goal.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{goal.title}</div>
                      <p style={{ margin: 0, color: "#64748b", fontSize: "0.8rem" }}>{goal.description}</p>
                    </div>
                    <Badge variant="outline">{goal.deadline}</Badge>
                  </div>
                  <div style={{ fontSize: "0.8rem", display: "flex", justifyContent: "space-between" }}>
                    <span>
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span>{percentage}%</span>
                  </div>
                  <GoalProgress>
                    <GoalProgressBar $value={percentage} />
                  </GoalProgress>
                </GoalCard>
              );
            })}
          </GoalsList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Lightbulb size={18} />
            친환경 실천 아이디어
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SelectField
            options={[{ value: "all", label: "전체" }, ...tipCategories]}
            value={selectedTipCategory}
            onChange={(event) => setSelectedTipCategory(event.target.value)}
          />
          <TipsList>
            {filteredTips.map((tip) => (
              <TipCard key={tip.id}>
                <TipMedia>
                  <ImageWithFallback src={tip.image} alt={tip.title} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <Badge tone={categoryTone(tip.category)}>{tip.category}</Badge>
                  </div>
                </TipMedia>
                <TipContent>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>{tip.title}</h3>
                    <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#475569" }}>
                      {tip.description}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Badge tone="success">영향: {tip.impact}</Badge>
                    <Badge tone="info">난이도: {tip.difficulty}</Badge>
                  </div>
                </TipContent>
              </TipCard>
            ))}
          </TipsList>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <TrendingUp size={18} />
            재활용 활동 추적
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "2rem", fontWeight: 700 }}>{totalPoints}</span>
            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>이번 달 획득 포인트</span>
            <Progress value={progressValue} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
              <span style={{ color: "#64748b" }}>목표 {monthlyGoal}pt</span>
              <span style={{ fontWeight: 600 }}>{Math.round(progressValue)}%</span>
            </div>
          </div>
          {progressValue >= 100 && (
            <HighlightBox>
              <Award size={18} />
              <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>목표를 달성했어요!</span>
            </HighlightBox>
          )}
          <Button variant="outline">
            <RotateCcw size={16} />
            활동 기록하기
          </Button>
          <TrackerGrid>
            <TrackerStat>
              <TrackerValue>{entries.length}</TrackerValue>
              <TrackerLabel>활동 건수</TrackerLabel>
            </TrackerStat>
            <TrackerStat>
              <TrackerValue>{totalItems}</TrackerValue>
              <TrackerLabel>처리 아이템</TrackerLabel>
            </TrackerStat>
            <TrackerStat>
              <TrackerValue>{categoryCount}</TrackerValue>
              <TrackerLabel>카테고리</TrackerLabel>
            </TrackerStat>
          </TrackerGrid>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
