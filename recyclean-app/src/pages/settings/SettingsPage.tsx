import { useState } from "react";
import styled from "@emotion/styled";
import {
  Bell,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  MapPin,
  Moon,
  Settings as SettingsIcon,
  Shield,
  Sun,
  User,
  Volume2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { Badge } from "../../shared/ui/Badge/Badge";
import { Button } from "../../shared/ui/Button/Button";
import { Switch } from "../../shared/ui/Switch/Switch";
import { Avatar, AvatarFallback, AvatarImage } from "../../shared/ui/Avatar/Avatar";
import { Separator } from "../../shared/ui/Separator/Separator";
import { SelectField } from "../../shared/ui/SelectField/SelectField";

const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  text-align: center;
`;

const SettingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const SettingsLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SettingsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const SectionStack = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

interface UserStats {
  totalPoints: number;
  itemsRecycled: number;
  joinDate: string;
  streakDays: number;
}

const languages = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" }
];

const regions = [
  { value: "kr", label: "대한민국" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" }
];

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);
  const [language, setLanguage] = useState("ko");
  const [region, setRegion] = useState("kr");

  const userStats: UserStats = {
    totalPoints: 287,
    itemsRecycled: 156,
    joinDate: "2024년 1월",
    streakDays: 12
  };

  return (
    <PageContainer>
      <Card>
        <CardContent>
          <ProfileRow>
            <Avatar size={64}>
              <AvatarImage src="" alt="사용자" />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>EcoWarrior</h3>
              <p style={{ margin: "4px 0 0", color: "#475569", fontSize: "0.85rem" }}>
                가입일 {userStats.joinDate}
              </p>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <Badge tone="success">{userStats.totalPoints} pts</Badge>
                <Badge variant="outline">{userStats.streakDays}일 연속</Badge>
              </div>
            </div>
          </ProfileRow>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <MapPin size={18} />
            나의 영향력
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StatGrid>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#16a34a" }}>
                {userStats.itemsRecycled}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>처리한 아이템</div>
            </div>
            <div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2563eb" }}>
                {userStats.totalPoints}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>누적 포인트</div>
            </div>
          </StatGrid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <SettingsIcon size={18} />
            앱 설정
          </CardTitle>
        </CardHeader>
        <SectionStack>
          <SettingsItem>
            <SettingsLabel>
              <Bell size={16} color="#64748b" />
              <SettingsText>
                <span style={{ fontWeight: 600 }}>알림</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>재활용 리마인더 알림</span>
              </SettingsText>
            </SettingsLabel>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </SettingsItem>

          <Separator />

          <SettingsItem>
            <SettingsLabel>
              <MapPin size={16} color="#64748b" />
              <SettingsText>
                <span style={{ fontWeight: 600 }}>위치 서비스</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>주변 배출함 찾기</span>
              </SettingsText>
            </SettingsLabel>
            <Switch checked={location} onCheckedChange={setLocation} />
          </SettingsItem>

          <Separator />

          <SettingsItem>
            <SettingsLabel>
              {darkMode ? <Moon size={16} color="#64748b" /> : <Sun size={16} color="#64748b" />}
              <SettingsText>
                <span style={{ fontWeight: 600 }}>다크 모드</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>어두운 테마로 변경</span>
              </SettingsText>
            </SettingsLabel>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </SettingsItem>

          <Separator />

          <SettingsItem>
            <SettingsLabel>
              <Volume2 size={16} color="#64748b" />
              <SettingsText>
                <span style={{ fontWeight: 600 }}>사운드</span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>액션 사운드 효과</span>
              </SettingsText>
            </SettingsLabel>
            <Switch checked={sounds} onCheckedChange={setSounds} />
          </SettingsItem>
        </SectionStack>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Globe size={18} />
            언어 및 지역
          </CardTitle>
        </CardHeader>
        <SectionStack>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "8px", fontSize: "0.85rem" }}>언어</div>
            <SelectField
              options={languages}
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            />
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: "8px", fontSize: "0.85rem" }}>지역</div>
            <SelectField options={regions} value={region} onChange={(event) => setRegion(event.target.value)} />
          </div>
        </SectionStack>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Shield size={18} />
            계정 및 지원
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActionList>
            <Button variant="outline" style={{ justifyContent: "flex-start" }}>
              <User size={16} />
              프로필 편집
            </Button>
            <Button variant="outline" style={{ justifyContent: "flex-start" }}>
              <Shield size={16} />
              개인정보 보호 설정
            </Button>
            <Button variant="outline" style={{ justifyContent: "flex-start" }}>
              <HelpCircle size={16} />
              도움말 센터
            </Button>
            <Button variant="outline" style={{ justifyContent: "flex-start" }}>
              <Info size={16} />
              앱 정보
            </Button>
            <Button variant="destructive" style={{ justifyContent: "flex-start" }}>
              <LogOut size={16} />
              로그아웃
            </Button>
          </ActionList>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
