import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import {
  AlertCircle,
  Camera,
  CheckCircle,
  RotateCcw,
  Scan,
  Upload,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui/Card/Card";
import { Button } from "../../shared/ui/Button/Button";
import { Badge } from "../../shared/ui/Badge/Badge";
import { ImageWithFallback } from "../../shared/media/ImageWithFallback/ImageWithFallback";

const PageContainer = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`;

const ResetButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
`;

const Spinner = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: rgba(99, 102, 241, 0.65);
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ResultTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ResultBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Callout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.infoSurface};
  color: ${({ theme }) => theme.colors.info};
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

interface RecognitionResult {
  item: string;
  confidence: number;
  recyclable: boolean;
  category: string;
  instructions: string;
  tips?: string;
}

const mockResults: RecognitionResult[] = [
  {
    item: "Plastic Water Bottle",
    confidence: 95,
    recyclable: true,
    category: "Plastic #1 (PET)",
    instructions: "라벨과 뚜껑을 제거하고 깨끗이 헹군 뒤 배출해요.",
    tips: "바닥의 재활용 기호 #1을 확인해요."
  },
  {
    item: "Pizza Box",
    confidence: 88,
    recyclable: false,
    category: "Contaminated Paper",
    instructions: "기름과 음식물이 묻어 재활용이 어려워요.",
    tips: "깨끗한 부분만 분리 배출하고 나머지는 일반쓰레기로 버려요."
  },
  {
    item: "Aluminum Can",
    confidence: 92,
    recyclable: true,
    category: "Aluminum",
    instructions: "물을 헹군 뒤 눌러서 부피를 줄여요.",
    tips: "금속류 중에서도 재활용 가치가 높아요."
  }
];

export function AnalyzePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<RecognitionResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const statusBadge = useMemo(() => {
    if (!result) return null;

    if (result.recyclable) {
      return <Badge tone="success">재활용 가능 ♻️</Badge>;
    }
    return <Badge tone="danger">재활용 불가 ❌</Badge>;
  }, [result]);

  const handleMockCapture = () => {
    setIsScanning(true);
    setCapturedImage(
      "https://images.unsplash.com/photo-1579756423478-02bc82a97679?auto=format&fit=crop&w=1080&q=80"
    );
    window.setTimeout(() => {
      const random = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(random);
      setIsScanning(false);
    }, 2500);
  };

  const handleMockUpload = () => {
    setIsScanning(true);
    setCapturedImage(
      "https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?auto=format&fit=crop&w=1080&q=80"
    );
    window.setTimeout(() => {
      const random = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(random);
      setIsScanning(false);
    }, 2000);
  };

  const reset = () => {
    setResult(null);
    setCapturedImage(null);
    setIsScanning(false);
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>
            <Scan size={18} />
            AI 재활용 분류
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ margin: 0, color: "#475569", fontSize: "0.9rem" }}>
            사진을 찍거나 이미지를 업로드하면 재활용 가능 여부와 처리 방법을 안내해요.
          </p>
        </CardContent>
      </Card>

      {!capturedImage && !result && (
        <Card>
          <CardContent>
            <ActionsContainer>
              <Button onClick={handleMockCapture} size="lg">
                <Camera size={18} />
                사진 촬영하기
              </Button>
              <Button onClick={handleMockUpload} variant="outline" size="lg">
                <Upload size={18} />
                이미지 업로드
              </Button>
            </ActionsContainer>
          </CardContent>
        </Card>
      )}

      {capturedImage && (
        <Card>
          <CardContent>
            <ImageWrapper>
              <ImageWithFallback
                src={capturedImage}
                alt="Captured"
                style={{ width: "100%", height: 220, objectFit: "cover" }}
              />
              <ResetButton variant="secondary" size="icon" onClick={reset} aria-label="사진 다시 촬영">
                <RotateCcw size={16} />
              </ResetButton>
            </ImageWrapper>
          </CardContent>
        </Card>
      )}

      {isScanning && (
        <Card>
          <CardContent style={{ textAlign: "center", gap: "16px" }}>
            <Spinner />
            <div style={{ fontWeight: 600 }}>이미지를 분석 중이에요...</div>
            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>잠시만 기다려 주세요.</div>
          </CardContent>
        </Card>
      )}

      {result && !isScanning && (
        <Card style={{ borderLeft: "4px solid #22c55e" }}>
          <CardHeader>
            <ResultHeader>
              <ResultTitle>
                {result.recyclable ? (
                  <CheckCircle size={20} color="#16a34a" />
                ) : (
                  <XCircle size={20} color="#dc2626" />
                )}
                <span>분류 결과</span>
              </ResultTitle>
              <Badge variant="outline">{result.confidence}% 확신</Badge>
            </ResultHeader>
          </CardHeader>
          <CardContent>
            <ResultBody>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{result.item}</h3>
                  <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "#475569" }}>
                    재질: {result.category}
                  </p>
                </div>
                {statusBadge}
              </div>

              <div>
                <h4 style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>처리 방법</h4>
                <p style={{ margin: 0, color: "#1f2933", fontSize: "0.9rem" }}>{result.instructions}</p>
              </div>

              {result.tips && (
                <Callout>
                  <AlertCircle size={18} />
                  <span style={{ fontSize: "0.85rem" }}>{result.tips}</span>
                </Callout>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <Button variant="outline" style={{ flex: 1 }} onClick={reset}>
                  다시 촬영
                </Button>
                <Button style={{ flex: 1 }}>재활용 처리 기록</Button>
              </div>
            </ResultBody>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            <AlertCircle size={18} />
            촬영 팁
          </CardTitle>
        </CardHeader>
        <CardContent>
          <TipsList>
            <li>빛이 충분한 곳에서 촬영해요.</li>
            <li>깨끗한 배경에서 촬영하면 인식률이 올라가요.</li>
            <li>재활용 기호가 보이도록 찍어주세요.</li>
            <li>가능하면 물체 정면에서 촬영해요.</li>
          </TipsList>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
