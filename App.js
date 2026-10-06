import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Share,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COURSES, HUB_BASE } from './courses';

const LAST_KEY = '@examhub:lastCourse';
const ONBOARD_KEY = '@examhub:onboarded';

const ONBOARD_STEPS = [
  {
    title: 'Welcome to Exam Prep Hub',
    text: '21 free exam courses — UPSC to PTE. No sign-up, no fees, forever.',
  },
  {
    title: 'Pick your course',
    text: 'Search or browse the picker. Each card opens that course\u2019s full study hub.',
  },
  {
    title: 'Always fresh',
    text: 'Course pages load live and update twice daily — no app update needed. Offline pages retry with one tap.',
  },
];

function CourseCard({ course, onOpen }) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderTopColor: course.accent }]}
      onPress={() => onOpen(course)}
      activeOpacity={0.7}
    >
      <Text style={[styles.cardAccent, { color: course.accent }]}>●</Text>
      <Text style={styles.cardTitle}>{course.title}</Text>
      <Text style={styles.cardTagline} numberOfLines={2}>{course.tagline}</Text>
      <Text style={styles.cardStats} numberOfLines={1}>{course.stats}</Text>
      <Text style={[styles.cardGo, { color: course.accent }]}>Open →</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [course, setCourse] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastVisited, setLastVisited] = useState(null);
  const [onboarded, setOnboarded] = useState(true);
  const [obStep, setObStep] = useState(0);
  const webviewRef = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem(LAST_KEY)
      .then((id) => {
        if (id) setLastVisited(COURSES.find((c) => c.id === id) || null);
      })
      .catch(() => {});
    AsyncStorage.getItem(ONBOARD_KEY)
      .then((v) => {
        if (!v) setOnboarded(false);
      })
      .catch(() => {});
  }, []);

  const finishOnboarding = () => {
    setOnboarded(true);
    AsyncStorage.setItem(ONBOARD_KEY, '1').catch(() => {});
  };

  const openCourse = (c) => {
    setCourse(c);
    setLoadError(false);
    setLoading(true);
    setScreen('course');
    AsyncStorage.setItem(LAST_KEY, c.id).catch(() => {});
    setLastVisited(c);
  };

  const goHome = () => setScreen('home');

  const shareApp = () => {
    Share.share({
      message: 'Exam Prep Hub — 21 free exam courses, no sign-up: ' + HUB_BASE,
    }).catch(() => {});
  };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? COURSES.filter((c) =>
        (c.title + ' ' + c.tagline + ' ' + c.stats).toLowerCase().includes(q)
      )
    : COURSES;

  if (screen === 'course' && course) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.courseHeader}>
          <TouchableOpacity onPress={goHome} style={styles.headerBtn}>
            <Text style={styles.headerBtnText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {course.title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setLoadError(false);
              setLoading(true);
              setRefreshKey((k) => k + 1);
            }}
            style={styles.headerBtn}
          >
            <Text style={styles.headerBtnText}>⟳</Text>
          </TouchableOpacity>
        </View>
        {loadError ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorTitle}>You're offline</Text>
            <Text style={styles.errorText}>
              This course needs an internet connection. Check your connection and try again.
            </Text>
            <TouchableOpacity
              style={styles.retryBtn}
              onPress={() => {
                setLoadError(false);
                setLoading(true);
                setRefreshKey((k) => k + 1);
              }}
            >
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <WebView
              key={refreshKey}
              ref={webviewRef}
              source={{ uri: HUB_BASE + course.file }}
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                setLoadError(true);
              }}
              startInLoadingState={false}
            />
            {loading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#6366F1" />
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {!onboarded && (
        <View style={styles.obOverlay}>
          <View style={styles.obCard}>
            <Text style={styles.obStep}>
              {obStep + 1} of {ONBOARD_STEPS.length}
            </Text>
            <Text style={styles.obTitle}>{ONBOARD_STEPS[obStep].title}</Text>
            <Text style={styles.obText}>{ONBOARD_STEPS[obStep].text}</Text>
            <View style={styles.obRow}>
              <TouchableOpacity onPress={finishOnboarding}>
                <Text style={styles.obSkip}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.obNext}
                onPress={() => {
                  if (obStep + 1 >= ONBOARD_STEPS.length) finishOnboarding();
                  else setObStep((s) => s + 1);
                }}
              >
                <Text style={styles.obNextText}>
                  {obStep + 1 >= ONBOARD_STEPS.length ? 'Start studying →' : 'Next →'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={styles.homeHeader}>
        <Text style={styles.appTitle}>Exam Prep Hub</Text>
        <Text style={styles.appSubtitle}>21 courses. Everything free.</Text>
        <TextInput
          style={styles.search}
          placeholder="Search courses…"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>
      {lastVisited && !q && (
        <TouchableOpacity
          style={styles.continueCard}
          onPress={() => openCourse(lastVisited)}
        >
          <Text style={styles.continueLabel}>Continue where you left off</Text>
          <Text style={styles.continueTitle}>{lastVisited.title} →</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <CourseCard course={item} onOpen={openCourse} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No courses match "{query}".</Text>
        }
      />
      <TouchableOpacity style={styles.shareBtn} onPress={shareApp}>
        <Text style={styles.shareText}>Share Exam Prep Hub</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  homeHeader: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 6 },
  appTitle: { fontSize: 30, fontWeight: '800', color: '#1E1B4B' },
  appSubtitle: { fontSize: 15, color: '#64748B', marginTop: 2 },
  search: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  continueCard: {
    marginHorizontal: 18,
    marginTop: 10,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  continueLabel: { fontSize: 12, color: '#6366F1', fontWeight: '600' },
  continueTitle: { fontSize: 17, fontWeight: '700', color: '#1E1B4B', marginTop: 2 },
  grid: { paddingHorizontal: 12, paddingBottom: 12 },
  row: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    margin: 6,
    borderTopWidth: 4,
    borderColor: '#E2E8F0',
    minHeight: 148,
  },
  cardAccent: { fontSize: 14 },
  cardTitle: { fontSize: 17, fontWeight: '800', color: '#1E1B4B', marginTop: 4 },
  cardTagline: { fontSize: 13, color: '#64748B', marginTop: 4 },
  cardStats: { fontSize: 12, color: '#94A3B8', marginTop: 6 },
  cardGo: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 40, fontSize: 16 },
  shareBtn: {
    marginHorizontal: 18,
    marginBottom: 14,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  shareText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  headerBtnText: { fontSize: 17, color: '#6366F1', fontWeight: '600' },
  courseTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: '#1E1B4B' },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(248,250,252,0.7)',
  },
  errorBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  errorTitle: { fontSize: 22, fontWeight: '800', color: '#1E1B4B' },
  errorText: { fontSize: 15, color: '#64748B', textAlign: 'center', marginTop: 8 },
  retryBtn: {
    marginTop: 18,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingHorizontal: 26,
    paddingVertical: 12,
  },
  retryText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  obOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30,27,75,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    padding: 28,
  },
  obCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 26, width: '100%' },
  obStep: { fontSize: 12, fontWeight: '700', color: '#6366F1' },
  obTitle: { fontSize: 22, fontWeight: '800', color: '#1E1B4B', marginTop: 6 },
  obText: { fontSize: 15, color: '#64748B', marginTop: 10, lineHeight: 22 },
  obRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 },
  obSkip: { fontSize: 15, color: '#94A3B8', fontWeight: '600' },
  obNext: { backgroundColor: '#6366F1', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12 },
  obNextText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
