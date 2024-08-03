import datetime

from django.db import models
from django.utils import timezone

class KPIModel(models.Model):
    total_calls = models.IntegerField(verbose_name='総着信数')  # 11_総着信数
    ivr_interruptions = models.IntegerField(verbose_name='自動音声ガイダンス途中切断数')  # 12_自動音声ガイダンス途中切断数
    abandoned_during_operator = models.IntegerField(verbose_name='オペレーター呼出途中放棄数')  # 14_オペレーター呼出途中放棄数
    abandoned_in_ivr = models.IntegerField(verbose_name='留守電放棄件数')  # 15_留守電放棄件数
    abandoned_calls = models.IntegerField(verbose_name='放棄呼数')  # 13_放棄呼数
    voicemails = models.IntegerField(verbose_name='留守電数')  # 16_留守電数
    responses = models.IntegerField(verbose_name='応答件数')  # 17_応答件数
    response_rate = models.FloatField(verbose_name='応答率')  # 応答率
    phone_inquiries = models.IntegerField(verbose_name='電話問い合わせ件数')  # 18_電話問い合わせ件数
    direct_handling = models.IntegerField(verbose_name='直受け対応件数')  # 21_直受け対応件数
    direct_handling_rate = models.FloatField(verbose_name='直受け対応率')  # 直受け対応率
    callback_count_0_to_20_min = models.IntegerField(verbose_name='お待たせ0分～20分対応件数')  # 23_お待たせ0分～20分対応件数
    cumulative_callback_under_20_min = models.IntegerField(verbose_name='お待たせ20分以内累計対応件数')  # 24_お待たせ20分以内累計対応件数
    cumulative_callback_rate_under_20_min = models.FloatField(verbose_name='お待たせ20分以内累計対応率')  # お待たせ20分以内累計対応率
    callback_count_20_to_30_min = models.IntegerField(verbose_name='お待たせ20分～30分対応件数')  # 25_お待たせ20分～30分対応件数
    cumulative_callback_under_30_min = models.IntegerField(verbose_name='お待たせ30分以内累計対応件数')  # 26_お待たせ30分以内累計対応件数
    cumulative_callback_rate_under_30_min = models.FloatField(verbose_name='お待たせ30分以内累計対応率')  # お待たせ30分以内累計対応率
    callback_count_30_to_40_min = models.IntegerField(verbose_name='お待たせ30分～40分対応件数')  # 27_お待たせ30分～40分対応件数
    cumulative_callback_under_40_min = models.IntegerField(verbose_name='お待たせ40分以内累計対応件数')  # 28_お待たせ40分以内累計対応件数
    cumulative_callback_rate_under_40_min = models.FloatField(verbose_name='お待たせ40分以内累計対応率')  # お待たせ40分以内累計対応率
    callback_count_40_to_60_min = models.IntegerField(verbose_name='お待たせ40分～60分対応件数')  # 29_お待たせ40分～60分対応件数
    cumulative_callback_under_60_min = models.IntegerField(verbose_name='お待たせ60分以内累計対応件数')  # 30_お待たせ60分以内累計対応件数
    cumulative_callback_rate_under_60_min = models.FloatField(verbose_name='お待たせ60分以内累計対応率')  # お待たせ60分以内累計対応率
    callback_count_over_60_min = models.IntegerField(verbose_name='お待たせ60分以上対応件数')  # 31_お待たせ60分以上対応件数
    waiting_for_callback_over_20min = models.IntegerField(verbose_name='お待たせ20分以上対応件数')  # 32_お待たせ20分以上対応件数
    waiting_for_callback_over_30min = models.IntegerField(verbose_name='お待たせ30分以上対応件数')  # 33_お待たせ30分以上対応件数
    waiting_for_callback_over_40min = models.IntegerField(verbose_name='お待たせ40分以上対応件数')  # 34_お待たせ40分以上対応件数
    waiting_for_callback_over_60min = models.IntegerField(verbose_name='お待たせ60分以上対応件数')  # 34_お待たせ60分以上対応件数
    wfc_20min_list = models.CharField(max_length=255, verbose_name='お待たせ20分以上対応案件番号', null=True, blank=True)  # お待たせ20分以上対応案件番号
    wfc_30min_list = models.CharField(max_length=255, verbose_name='お待たせ30分以上対応案件番号', null=True, blank=True)  # お待たせ30分以上対応案件番号
    wfc_40min_list = models.CharField(max_length=255, verbose_name='お待たせ40分以上対応案件番号', null=True, blank=True)  # お待たせ40分以上対応案件番号
    wfc_60min_list = models.CharField(max_length=255, verbose_name='お待たせ60分以上対応案件番号', null=True, blank=True)  # お待たせ60分以上対応案件番号
    created_at = models.DateTimeField(default=timezone.now, editable=False)  # 作成日時
    updated_at = models.DateTimeField(default=timezone.now)  # 更新日時

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f'Created at {timezone.localtime(self.created_at).strftime('%Y/%m/%d %H:%M:%S')}'


class Operator(models.Model):
    name = models.CharField(max_length=100, verbose_name='オペレーター名')
    reporter_name = models.CharField(max_length=100, verbose_name='CTStage名', null=True, blank=True)
    sweet_name = models.CharField(max_length=100, verbose_name='Sweet名', null=True, blank=True)
    is_supervisor = models.BooleanField(verbose_name='スーパーバイザーかどうか', default=False)
    is_active = models.BooleanField(verbose_name='アクティブかどうか', default=True)
    csc_group = models.ForeignKey('CSCGroup', on_delete=models.CASCADE, verbose_name='CSCグループ', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class CSCGroup(models.Model):
    name = models.CharField(max_length=100, verbose_name='CSCグループ名')
    created_at = models.DateTimeField(default=timezone.now, editable=False)
    updated_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
